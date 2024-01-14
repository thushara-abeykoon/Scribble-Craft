import json
import os
import threading
from http.client import HTTPException

import cv2
import requests
from flask import jsonify

from manual_config.image_config import request_svg, get_image, enhance_image, remove_background


class FontConfig:

    def __init__(self):
        self.convert_thread = None
        self.available_files = list(map(lambda x: chr(x), range(65, 67)))
        self.current_user_email = None
        self.files_list: list = []
        self.user_folder = None
        self.uploads_folder = None
        self.svg_folder = None
        self.rembg_folder = None
        self.convert_error = False
        self.image_status: dict = {}
        self.status = {"status": "uploading images"}

    def get_upload(self, current_user_email, files_list):

        self.current_user_email = current_user_email
        self.files_list = files_list

        self.directory_maker("users")

        self.user_folder = self.directory_maker(os.path.join("users", self.current_user_email))
        self.uploads_folder = self.directory_maker(os.path.join(self.user_folder, 'uploads'))
        self.svg_folder = self.directory_maker(os.path.join(self.user_folder, 'svg_images'))

        if not self.is_all_files_available():
            return jsonify({'error': 'Missing images'}), 400

        for available_file in self.available_files:
            file = self.files_list[available_file]
            save_name = f"{available_file}.{file.filename.split('.')[-1]}"
            self.image_status.update({save_name.split('.')[0]: 'converting'})
            file.save(os.path.join(self.uploads_folder, save_name))

        self.convert_thread = threading.Thread(target=self.convert_images_into_svg)
        self.convert_thread.start()
        return jsonify({'upload_success': True}), 200

    def is_all_files_available(self):
        if len(self.files_list) == 0:
            return False
        for available_char in self.available_files:
            try:
                self.files_list[available_char]
            except:
                return False

        return True

    @staticmethod
    def directory_maker(folder_path):
        if not os.path.exists(folder_path):
            os.mkdir(folder_path)
        return folder_path

    def enhance_and_rembg(self):
        self.rembg_folder = self.directory_maker(os.path.join(self.user_folder, 'rembg'))
        for image_name in os.listdir(self.uploads_folder):
            enhanced_cv2_image = enhance_image(cv2.imread(os.path.join(self.uploads_folder, image_name)))
            background_removed_image = remove_background(enhanced_cv2_image)

            cv2.imwrite(os.path.join(self.rembg_folder, f"{image_name.split('.')[0]}.png"), background_removed_image)

    def convert_images_into_svg(self):
        self.status.update({"status": "enhancing and background removing"})
        self.enhance_and_rembg()
        self.status.update({"status": "converting images into svg"})
        json_res = None
        for image_name in os.listdir(self.rembg_folder):
            image_response = request_svg(os.path.join(self.rembg_folder, image_name))
            print(image_response)

            if image_response['code'] == 200:
                convert_id = image_response['data']['id']
            else:
                convert_id = None
                self.image_status.update({image_name.split('.')[0]: "convert_error"})

            while True and convert_id is not None:
                res = get_image(convert_id)
                json_res = json.loads(res.text)

                if json_res['code'] == 200:
                    convert_status = json_res['data']['step']
                    print(convert_status)
                    if convert_status != 'convert':
                        self.image_status.update({image_name.split('.')[0]: "convert_finished"})
                        break
                else:
                    print("Error")
                    raise HTTPException(json_res['code'])

            if json_res is not None:
                image_url = json_res['data']['output']['url']
                image_response = requests.get(image_url)
                self.save_svg(image_response.content, f"{image_name.split('.')[0]}.svg")

        print(self.image_status)
        self.status.update({"status": "font making started"})

    def save_svg(self, content, filename):
        with open(os.path.join(self.svg_folder, filename), 'wb') as svg_image:
            svg_image.write(content)

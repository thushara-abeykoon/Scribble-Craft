import base64
import io
import os
import threading

import cv2
from PIL import Image
from flask import jsonify

from manual_config.font_handler import FontConfig
from model_config.model_handler import ModelConfig


class AutomaticFontConfig(FontConfig):
    def __init__(self):
        super().__init__()

        self.document_path = None
        self.current_user_email = None
        self.document = None
        self.identified_characters = None
        self.status = {"status": "uploading document"}
        self.predictions = {}
        self.predictions_folder = None

    def create_necessary_dirs(self):
        self.directory_maker('users')
        self.user_folder = self.directory_maker(os.path.join('users', self.current_user_email))
        self.user_folder = self.directory_maker(os.path.join(self.user_folder, 'automatic'))
        self.predictions_folder = self.directory_maker(os.path.join(self.user_folder, 'predictions'))
        self.uploads_folder = self.directory_maker(os.path.join(self.user_folder, 'uploads'))
        self.svg_folder = self.directory_maker(os.path.join(self.user_folder, 'svgs'))

    def get_upload(self, current_user_email, document):
        # creating directories for users
        self.current_user_email = current_user_email
        self.document = document

        self.create_necessary_dirs()

        # validating uploaded image
        if not self.doc_validator():
            return jsonify({"error": "file type cannot be accepted!"}), 422

        # saving uploaded image
        self.document_path = os.path.join(self.user_folder, document.filename)
        document.save(self.document_path)

        # starting new thread for image predictions function
        threading.Thread(target=self.image_predictions()).start()
        return jsonify({"status": "uploaded successfully"}), 200

    def doc_validator(self):
        allowed_doc_types = ['jpg', 'png']
        filename = self.document.filename
        extension = filename.split('.')[-1]

        return extension in allowed_doc_types

    def image_predictions(self):
        self.status.update({"status": "character prediction started"})
        # making predictions on uploaded image
        model_config = ModelConfig(self.document_path)
        self.predictions = model_config.get_predictions()
        for label in model_config.labels:
            label_dir = os.path.join(self.predictions_folder, label)
            self.directory_maker(label_dir)

            if label in self.predictions:
                self.save_img(label_dir, self.predictions[label])

    @staticmethod
    def save_img(label_dir, img_arr):
        count = 1
        for img in img_arr:
            save_path = os.path.join(label_dir, f'{str(count)}.jpg')
            cv2.imwrite(save_path, img)
            print(f"Saved to {save_path}")
            count += 1

    def get_images(self, character_name):
        image_array = []
        for image in self.predictions[character_name]:
            pil_image = Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
            buffered = io.BytesIO()
            pil_image.save(buffered, format="PNG")
            image_array.append(base64.b64encode(buffered.getvalue()).decode('ascii'))

        return image_array

    def handle_upload_data(self, character_data):
        self.current_user_email = "thushara2@gmail.com"
        self.create_necessary_dirs()
        # save each character image by its base64 data
        try:
            for character in character_data:
                name = character['name']
                data = character['data']
                file_format = data.split(';')[0].split('/')[1]
                base64_data = data.split(',')[1].encode('utf-8')
                with open(f'{os.path.join(self.uploads_folder, name)}.{file_format}', 'wb') as file:
                    file.write(base64.decodebytes(base64_data))
        except Exception as e:
            print(e)
            return jsonify({"error": str(e)}), 500

        threading.Thread(target=self.convert_images_into_svg()).start()

        return jsonify({"status": "uploaded successfully"}), 200







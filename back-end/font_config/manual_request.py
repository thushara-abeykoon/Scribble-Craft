import json
import os.path
from http.client import HTTPException

import requests
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import Blueprint, request, jsonify
from font_config.image_config import enhance_image, request_svg, get_image

font = Blueprint('font', __name__)

available_files = []

for ascii_num in range(65, 67):
    available_files.append(chr(ascii_num))


def directory_maker(folder_path):
    if not os.path.exists(folder_path):
        os.mkdir(folder_path)
    return folder_path


@font.route('/manual_generate', methods=['POST'])
@jwt_required()
def get_upload():
    directory_maker('users')
    current_user_email = get_jwt_identity()
    user_folder = directory_maker(os.path.join('users', current_user_email))
    uploads_folder = directory_maker(os.path.join(user_folder, 'uploads'))
    svg_folder = directory_maker(os.path.join(user_folder, 'svg_images'))

    if not isAllFilesAvailable(request.files):
        return jsonify({'error': 'Missing images'}), 400

    for available_file in available_files:
        file = request.files[available_file]
        print(type(file))
        # file = enhance_image(file)
        file.save(uploads_folder+'/'+available_file+'.'+file.filename.split('.')[-1])

    convert_images_into_svg(uploads_folder, svg_folder)

    return jsonify({'upload_success': True}), 200


def isAllFilesAvailable(files_array):
    if len(files_array) == 0:
        return False
    for available_char in available_files:
        try:
            files_array[available_char]
        except:
            return False

    return True


def convert_images_into_svg(uploads_folder, svg_folder):
    global json_res
    for image_name in os.listdir(uploads_folder):
        image_status = request_svg(os.path.join(uploads_folder, image_name))
        print(image_status)

        if image_status['code'] == 200:
            convert_id = image_status['data']['id']
        else:
            convert_id = None
        while True and convert_id is not None:
            res = get_image(convert_id)
            json_res = json.loads(res.text)

            if json_res['code'] == 200:
                convert_status = json_res['data']['step']
                print(convert_status)
                if convert_status != 'convert':
                    break
            else:
                raise HTTPException(json_res['code'])

        image_url = json_res['data']['output']['url']
        image_response = requests.get(image_url)

        save_svg(image_response.content, image_name.split('.')[0]+'.svg', svg_folder)


def save_svg(image, image_name, svg_folder):
    with open(os.path.join(svg_folder, image_name), 'wb') as svg_image:
        svg_image.write(image)

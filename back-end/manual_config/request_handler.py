import base64
import os

import cv2
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from manual_config.font_handler import FontConfig
from manual_config.image_config import enhance_image

manual = Blueprint('manual', __name__)

font_config = FontConfig()


@manual.route('/generate', methods=['POST'])
@jwt_required()
def manual_generate():
    status = font_config.get_upload(current_user_email=get_jwt_identity(), files_list=request.files, files_type="other")
    print(font_config.image_status)
    return status


@manual.route('/status', methods=['GET'])
def get_status():
    return jsonify(font_config.status)


@manual.route('/create_font', methods=['POST'])
def create_font():
    data = request.json
    font_name = data['font_name']
    font_family = data['font_family']

    font_config.create_font(font_name, font_family)

    return jsonify({"status": "font making completed"})


@manual.route('/request-font', methods=['GET'])
@jwt_required()
def get_font():
    user_folder = os.path.join("users", get_jwt_identity())
    if os.path.exists(user_folder):
        print("user folder found")
        font_folder_list = [os.path.join(user_folder, "automatic"), os.path.join(user_folder, "manual")]
        for font_folder in font_folder_list:
            if os.path.exists(font_folder):
                for file in os.listdir(font_folder):
                    print(file)
                    if file.split('.')[-1] == "ttf":
                        # return send_file(path_or_file=f"{font_folder}/{file}")
                        return {"font": to_base64(f"{font_folder}/{file}")}

    return {"error": "font not created yet"}, 404


@manual.route('/threshold-image/<thresh_value>', methods=['GET'])
def threshold_image(thresh_value):
    if not os.path.exists("temp"):
        os.mkdir("temp")
    image = request.files['image']

    file_save_path = os.path.join("temp", image.filename)
    image.save(file_save_path)
    cv2_image = cv2.imread(file_save_path)
    enhanced_image = enhance_image(cv2_image)
    _, image_array = cv2.imencode('.jpg', enhanced_image)
    im_bytes = image_array.tobytes()
    os.remove(file_save_path)
    return base64.b64encode(im_bytes)


def to_base64(file_path):
    with open(file_path, 'rb') as file:
        binary = file.read()
    bas64_string = base64.b64encode(binary).decode('utf-8')
    return bas64_string

import base64
import os

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from manual_config.font_handler import FontConfig

manual = Blueprint('manual', __name__)

font_config = FontConfig()


@manual.route('/generate', methods=['POST'])
@jwt_required()
def manual_generate():
    status = font_config.get_upload(current_user_email=get_jwt_identity(), files_list=request.files)
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
        font_folder = os.path.join(user_folder, "manual")
        if os.path.exists(font_folder):
            for file in os.listdir(font_folder):
                print(file)
                if file.split('.')[-1] == "ttf":
                    # return send_file(path_or_file=f"{font_folder}/{file}")
                    return {"font": to_base64(f"{font_folder}/{file}")}

    return {"error": "font not created yet"}, 404


def to_base64(file_path):
    with open(file_path, 'rb') as file:
        binary = file.read()
    bas64_string = base64.b64encode(binary).decode('utf-8')
    return bas64_string

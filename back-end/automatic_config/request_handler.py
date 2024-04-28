from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from automatic_config.font_handler import AutomaticFontConfig
from model_config.model_handler import ModelConfig

automatic = Blueprint('auto', __name__)

font_config = AutomaticFontConfig()


@automatic.route('/upload_file', methods=['POST'])
# @jwt_required
def upload_file():
    # model_config = ModelConfig("users/thushara2@gmail.com/automatic/characters.jpg")
    # pred = model_config.get_predictions()
    # print(pred)
    # return "hello"
    current_user_email = "thushara2@gmail.com"
    # current_user_email = get_jwt_identity()
    files = request.files
    print(files)
    status = font_config.get_upload(current_user_email, request.files['file'])
    return status


@automatic.route('/request_predictions/<character_name>', methods=['GET'])
def request_predictions(character_name):
    character_array = font_config.get_images(character_name)
    return jsonify(character_array), 200


@automatic.route('/generate', methods=['POST'])
# @jwt_required()
def auto_generate():
    current_user_email = "thushara2@gmail.com"
    character_data = request.json

    if type(character_data) is not list:
        return jsonify({'error': 'Invalid data'}), 400

    return font_config.handle_upload_data(character_data)



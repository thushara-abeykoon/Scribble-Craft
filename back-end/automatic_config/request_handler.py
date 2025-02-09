from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from automatic_config.font_handler import AutomaticFontConfig
from manual_config.font_handler import FontConfig

automatic = Blueprint('auto', __name__)

font_config = AutomaticFontConfig()
font_config_manual = FontConfig("automatic")


@automatic.route('/upload_file', methods=['POST'])
@jwt_required()
def upload_file():
    current_user_email = get_jwt_identity()
    files = request.files
    print(files)
    status = font_config.get_upload(current_user_email, request.files['file'])
    return status


@automatic.route('/request_predictions/<character_name>', methods=['GET'])
def request_predictions(character_name):
    character_array = font_config.get_images(character_name)
    return jsonify(character_array), 200


@automatic.route('/generate', methods=['POST'])
@jwt_required()
def auto_generate():
    current_user_email = get_jwt_identity()
    character_data = request.json

    if type(character_data) is not list:
        return jsonify({'error': 'Invalid data'}), 400

    return font_config_manual.get_upload(current_user_email, character_data, "base64")


@automatic.route('/status', methods=['GET'])
def get_status():
    return jsonify(font_config_manual.status)

@automatic.route('/create_font', methods=['POST'])
def create_font():
    data = request.json
    font_name = data['font_name']
    font_family = data['font_family']

    font_config_manual.create_font(font_name, font_family)

    return jsonify({"status": "font making completed"})


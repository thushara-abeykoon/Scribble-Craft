from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from automatic_config.font_handler import AutomaticFontConfig

automatic = Blueprint('auto', __name__)

font_config = AutomaticFontConfig()


@automatic.route('/upload_file', methods=['POST'])
# @jwt_required
def upload_file():
    current_user_email = "thushara"
    # current_user_email = get_jwt_identity()
    files = request.files
    print(files)
    status = font_config.get_upload(current_user_email, request.files['file'])
    return status


@automatic.route('/request_predictions/<character_name>', methods=['GET'])
def request_predictions(character_name):
    character_array = font_config.get_images(character_name)
    return jsonify(character_array), 200

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from manual_config.font_handler import FontConfig

font = Blueprint('font', __name__)

font_config = FontConfig()


@font.route('/manual_generate', methods=['POST'])
@jwt_required()
def manual_generate():
    status = font_config.get_upload(current_user_email=get_jwt_identity(), files_list=request.files)
    print(font_config.image_status)
    return status


@font.route('/status', methods=['GET'])
def get_status():
    return jsonify(font_config.status)


@font.route('/create_font', methods=['POST'])
def create_font():
    data = request.json
    font_name = data['font_name']
    font_family = data['font_family']

    font_config.create_font(font_name, font_family)

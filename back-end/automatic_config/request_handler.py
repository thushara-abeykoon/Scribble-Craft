from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from automatic_config.font_handler import AutomaticFontConfig

automatic = Blueprint('auto', __name__)

font_config = AutomaticFontConfig()


@automatic.route('/upload_file', methods=['POST'])
# @jwt_required
def upload_file():
    current_user_email = "thushara"
    status = font_config.get_upload(current_user_email, request.files['file'])
    return status


import os.path
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import Blueprint, request, jsonify

font = Blueprint('font', __name__)

if not os.path.exists('users'):
    os.mkdir('users')

available_files = []

for ascii_num in range(65, 67):
    available_files.append(chr(ascii_num))


@font.route('/manual_generate', methods=['POST'])
@jwt_required()
def generate_font():
    current_user_email = get_jwt_identity()
    user_folder = os.path.join('users', current_user_email)
    uploads_folder = os.path.join(user_folder, 'uploads')
    if not os.path.exists(user_folder):
        os.mkdir(user_folder)

    if not os.path.exists(uploads_folder):
        os.mkdir(uploads_folder)

    if not isAllFilesAvailable(request.files):
        return jsonify({'error': 'Missing images'}), 400

    for available_file in available_files:
        file = request.files[available_file]
        file.save(uploads_folder+'/'+available_file+'.'+file.filename.split('.')[-1])

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

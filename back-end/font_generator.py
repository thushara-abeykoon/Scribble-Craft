import os.path
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import Blueprint, request, jsonify

font = Blueprint('font', __name__)

if not os.path.exists('uploads'):
    os.mkdir('uploads')

available_files = []

# for ascii_num in range(48, 90):
#     if 57 < ascii_num < 65:
#         continue
for ascii_num in range(49, 51):
    available_files.append(chr(ascii_num))


@font.route('/manual_generate', methods=['POST'])
@jwt_required()
def generate_font():
    current_user_email = get_jwt_identity()
    if not os.path.exists('uploads/'+current_user_email):
        os.mkdir('uploads/' + current_user_email)

    if not isAllFilesAvailable(request.files):
        return jsonify({'error': 'Missing images'}), 400

    for available_file in available_files:
        file = request.files[available_file]
        file.save('uploads/'+current_user_email+'/'+available_file+'.'+file.filename.split('.')[-1])

    return jsonify({'success': True}), 200


def isAllFilesAvailable(files_array):
    if len(files_array) == 0:
        return False
    for available_char in available_files:
        try:
            files_array[available_char]
        except Exception as e:
            return False

    return True

import os.path

from flask import Blueprint, request, jsonify

font = Blueprint('font', __name__)


@font.route('/manual_generate', methods=['POST'])
def generate_font():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected File'}), 400

    if not os.path.exists('uploads'):
        os.mkdir('uploads')

    file.save('uploads/' + file.filename)

    return jsonify({'success': True}), 200

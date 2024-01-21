import os
import threading

from flask import jsonify

from manual_config.font_handler import FontConfig


class AutomaticFontConfig(FontConfig):
    def __init__(self):
        super().__init__()

        self.current_user_email = None
        self.document = None
        self.identified_characters = None
        self.status = {"status": "uploading document"}

    def get_upload(self, current_user_email, document):
        self.current_user_email = current_user_email
        self.document = document
        self.directory_maker('users')
        self.user_folder = self.directory_maker(os.path.join('users', self.current_user_email))
        self.user_folder = self.directory_maker(os.path.join(self.user_folder, 'automatic'))

        if not self.doc_validator():
            return jsonify({"error": "file type cannot be accepted!"}), 422

        self.convert_thread = threading.Thread(target=self.character_predictor())

    def doc_validator(self):
        allowed_doc_types = ['jpg', 'png']
        filename = self.document.filename
        extension = filename.split('.')[-1]

        return extension in allowed_doc_types

    def character_predictor(self):
        print("hello")
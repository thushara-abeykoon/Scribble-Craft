import os
import threading

import cv2
from flask import jsonify

from manual_config.font_handler import FontConfig
from model_config.model_handler import ModelConfig


class AutomaticFontConfig(FontConfig):
    def __init__(self):
        super().__init__()

        self.document_path = None
        self.current_user_email = None
        self.document = None
        self.identified_characters = None
        self.status = {"status": "uploading document"}
        self.predictions = {}
        self.predictions_folder = None

    def get_upload(self, current_user_email, document):
        self.current_user_email = current_user_email
        self.document = document
        self.directory_maker('users')
        self.user_folder = self.directory_maker(os.path.join('users', self.current_user_email))
        self.user_folder = self.directory_maker(os.path.join(self.user_folder, 'automatic'))
        self.predictions_folder = self.directory_maker(os.path.join(self.user_folder, 'predictions'))

        if not self.doc_validator():
            return jsonify({"error": "file type cannot be accepted!"}), 422

        self.document_path = os.path.join(self.user_folder, document.filename)
        document.save(self.document_path)

        self.convert_thread = threading.Thread(target=self.image_predictions())
        self.convert_thread.start()
        return jsonify({"status": "uploaded successfully"}), 200

    def doc_validator(self):
        allowed_doc_types = ['jpg', 'png']
        filename = self.document.filename
        extension = filename.split('.')[-1]

        return extension in allowed_doc_types

    def image_predictions(self):
        self.status.update({"status": "character prediction started"})
        model_config = ModelConfig(self.document_path)
        self.predictions = model_config.get_predictions()
        for label in model_config.labels:
            label_dir = os.path.join(self.predictions_folder, label)
            self.directory_maker(label_dir)

            if label in self.predictions:
                self.save_img(label_dir, self.predictions[label])

    @staticmethod
    def save_img(label_dir, img_arr):
        count = 1
        for img in img_arr:
            save_path = os.path.join(label_dir, f'{str(count)}.jpg')
            cv2.imwrite(save_path, img)
            print(f"Saved to {save_path}")
            count += 1


import os

from flask import jsonify


class FontConfig:

    def __init__(self):
        self.convert_thread = None
        self.available_files = list(map(lambda x: chr(x), range(65, 67)))
        self.current_user_email = None
        self.files_list: list = []
        self.user_folder = None
        self.uploads_folder = None
        self.svg_folder = None

    def get_upload(self, current_user_email, files_list):

        self.current_user_email = current_user_email
        self.files_list = files_list

        self.directory_maker("users")

        self.user_folder = self.directory_maker(os.path.join("users", self.current_user_email))
        self.uploads_folder = self.directory_maker(os.path.join(self.user_folder, 'uploads'))
        self.svg_folder = self.directory_maker(os.path.join(self.user_folder, 'svg_images'))

        if not self.is_all_files_available():
            return jsonify({'error': 'Missing images'}), 400

        for available_file in self.available_files:
            file = self.files_list[available_file]
            file.save(os.path.join(self.uploads_folder, f'{available_file}.{file.filename.split(".")[-1]}'))

        # self.convert_thread = threading.Thread(target=self.convert_images_into_svg)
        # self.convert_thread.start()
        return jsonify({'upload_success': True}), 200

    def is_all_files_available(self):
        if len(self.files_list) == 0:
            return False
        for available_char in self.available_files:
            try:
                self.files_list[available_char]
            except:
                return False

        return True

    @staticmethod
    def directory_maker(folder_path):
        if not os.path.exists(folder_path):
            os.mkdir(folder_path)
        return folder_path

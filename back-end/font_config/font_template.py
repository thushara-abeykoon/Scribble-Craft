import base64
import json

import requests

from manual_config.image_config import api_key, convertio_url, get_status


class FontTemplate:
    def __init__(self, font_name, font_family, font_weight, font_style):
        self.font_name = font_name
        self.font_family = font_family
        self.font_weight = font_weight
        self.font_style = font_style
        self.svg_header = f'''<svg xmlns='http://www.w3.org/2000/svg'><defs><font id="{self.font_name}" horiz-adv-x="0">'''
        self.svg_footer = '''</font></defs></svg>'''
        self.font_header = f'''<font-face font-family="{self.font_family}" font-weight="{self.font_weight}" font-style="{self.font_style}" font-stretch="normal" units-per-em="2048" panose-1="2 0 5 0 0 0 0 9 0 0" ascent="1638" descent="-410" x-height="552" cap-height="1480" bbox="-3014 -939 9165 1783" underline-position="-292" unicode-range="U+001D-FB04" /> '''
        self.font = None

    def create_font(self, glyphs: list):
        self.font = self.svg_header + self.font_header

        for glyph in glyphs:
            self.font += glyph

        self.font += self.svg_footer

    def get_svg_font(self):
        return self.font

    def request_ttf(self):
        payload_for_font = {
            "apikey": api_key,
            "input": "base64",
            "file": base64.b64encode(self.font.encode('utf-8')).decode('utf-8'),
            "filename": "font.svg",
            "outputformat": "ttf"
        }

        res = requests.post(convertio_url, json=payload_for_font)
        return json.loads(res.text)

    @staticmethod
    def ttf_conversion_status(convert_id):
        return get_status(convert_id)

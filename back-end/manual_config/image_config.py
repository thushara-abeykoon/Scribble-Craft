import base64
import json
import cv2
import requests

convertio_url = "https://api.convertio.co/convert"
api_key = "4ba4628d566be49d8173da05a49ecd4c"


def enhance_image(image):
    cv2.resize(image, (200, 200))
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, threshold_image = cv2.threshold(gray_image, 127, 255, cv2.THRESH_BINARY)

    return threshold_image


def request_svg(image_path):
    payload_for_id = {
        "apikey": api_key,
        "input": "base64",
        "file": convert_image_to_base64_string(image_path),
        "filename": "apple-icon.png",
        "outputformat": "svg"
    }

    res = requests.post(convertio_url, json=payload_for_id)
    return json.loads(res.text)


def get_image(convert_id):
    url_response = requests.get(convertio_url + f"/{convert_id}/status")
    return url_response


def convert_image_to_base64_string(filepath):
    with open(filepath, mode='rb') as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')

    return encoded_string


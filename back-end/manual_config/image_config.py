import base64
import json
import cv2
import rembg
import requests


def get_from_txt():
    with open("manual_config/api_keys.txt", 'r') as label_file:
        return label_file.read().splitlines()


api_key = get_from_txt()
convertio_url = "https://api.convertio.co/convert"


def enhance_image(image):
    cv2.resize(image, (200, 200))
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, threshold_image = cv2.threshold(gray_image, 127, 255, cv2.THRESH_BINARY)

    return threshold_image


def request_svg(image_path, api_index):
    payload_for_id = {
        "apikey": api_key[api_index],
        "input": "base64",
        "file": convert_image_to_base64_string(image_path),
        "filename": "apple-icon.png",
        "outputformat": "svg"
    }

    res = requests.post(convertio_url, json=payload_for_id)
    if res.status_code != 200:
        api_index += 1
        if api_index < len(api_key):
            return request_svg(image_path, api_index)
    return json.loads(res.text)


def get_status(convert_id):
    url_response = requests.get(convertio_url + f"/{convert_id}/status")
    return url_response


def convert_image_to_base64_string(filepath):
    with open(filepath, mode='rb') as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')

    return encoded_string


def remove_background(image):
    return rembg.remove(image)

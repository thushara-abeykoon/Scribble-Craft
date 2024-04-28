import base64
import json
import cv2
from PIL import Image
import rembg
import requests


def get_from_txt():
    with open("manual_config/api_keys.txt", 'r') as label_file:
        return label_file.read().splitlines()


api_key = get_from_txt()
convertio_url = "https://api.convertio.co/convert"


def enhance_image(image, thresh_value):
    cv2.resize(image, (200, 200))
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, threshold_image = cv2.threshold(gray_image, thresh_value, 255, cv2.THRESH_BINARY)

    return threshold_image


def request_svg(image_path, api_index):
    print(api_key[api_index])
    payload_for_id = {
        "apikey": api_key[api_index],
        "input": "base64",
        "file": convert_image_to_base64_string(image_path),
        "filename": "apple-icon.png",
        "outputformat": "svg"
    }

    res = requests.post(convertio_url, json=payload_for_id)
    print(res.text)
    if res.status_code != 200:
        if api_index < len(api_key):
            api_index = api_index + 1
        else:
            api_index = 0
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
    # return rembg.remove(image)
    # convert opencv image to PIL image
    color_converted = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    pil_image = Image.fromarray(color_converted)

    pil_image = pil_image.convert('RGBA')
    datas = pil_image.getdata()

    new_data = []
    for item in datas:
        if item[0] == 255 and item[1] == 255 and item[2] == 255:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)

    pil_image.putdata(new_data)
    return pil_image



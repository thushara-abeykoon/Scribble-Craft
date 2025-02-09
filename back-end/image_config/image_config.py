import base64
import json
import cv2
from PIL import Image
import requests

def enhance_image(image):
    cv2.resize(image, (200, 200))
    grey_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, threshold_image = cv2.threshold(grey_image, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)

    return threshold_image

def remove_background(image):
    rgba_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGBA)
    pil_image = Image.fromarray(rgba_image)

    image_data = pil_image.getdata()
    new_image_data = []

    for item in image_data:
        if item[0] == 255 and item[1] == 255 and item[2] == 255:
            new_image_data.append((255,255,255,0))
        else:
            new_image_data.append(item)

    pil_image.putdata(new_image_data)
    return pil_image


# CONVERTIO API RELATED IMPLEMENTATION
def get_convertio_api_keys():
    with open("api_keys.txt", 'r') as label_file:
        return label_file.read().splitlines()

api_key_list = get_convertio_api_keys()

convertio_url = "https://api.convertio.co/convert"

def get_svg(image_path, filename, api_index):
    base64_image = __convert_image_to_base64(image_path)
    print(f"trying to get svg character {filename}")
    return __request_svg(base64_image, filename, api_index)


def get_svg_image_status(convert_id):
    return requests.get(f"{convertio_url}/{convert_id}/status")

def __request_svg(base64_image, filename, api_index):
    print(f"attempting via api key {api_index}")
    image_payload = {
        "apikey": api_key_list[api_index],
        "input": "base64",
        "file": base64_image,
        "filename": filename,
        "outputformat": "svg"
    }
    res = requests.post(convertio_url, json=image_payload)
    if res.status_code != 200:
        if api_index == len(api_key_list):
            print("attempt failed!")
            print("out of api keys")
            return None
        elif api_index < len(api_key_list):
            api_index = api_index + 1
            print(f"reattempting...")
            return __request_svg(base64_image, filename, api_index)
    else:
        print("attempt success!")
        return json.loads(res.text)

def __convert_image_to_base64(image_path):
    with open(image_path, mode='rb') as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    return encoded_string
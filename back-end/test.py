# from manual_config.font_handler import FontConfig
#
# font_config = FontConfig()
#
# status = font_config.get_upload("thushara",{"A":"a","B":"b"}, "base64")
#
# print(status)


# from model_config.model_handler import ModelConfig
#
# model_config = ModelConfig('A.png')
#
# pred = model_config.get_letters()
#
# print(pred)




# import cv2
# import imutils
# import keras
# import numpy as np
# from matplotlib import pyplot as plt
#
# model = keras.models.load_model('model_config/model.h5')
# with open("model_config/api_keys.txt", 'r') as label_file:
#     labels = label_file.read().splitlines()
#
#
# def sort_contours(cnts, method="left-to-right"):
#     reverse = False
#     i = 0
#     if method == "right-to-left" or method == "bottom-to-top":
#         reverse = True
#     if method == "top-to-bottom" or method == "bottom-to-top":
#         i = 1
#     boundingBoxes = [cv2.boundingRect(c) for c in cnts]
#     (cnts, boundingBoxes) = zip(*sorted(zip(cnts, boundingBoxes),key=lambda b: b[1][i], reverse=reverse))
#     # return the list of sorted contours and bounding boxes
#     return cnts, boundingBoxes
#
#
# def get_letters(img):
#     letters = []
#     image = cv2.imread(img)
#     gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
#     ret, thresh1 = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)
#     dilated = cv2.dilate(thresh1, None, iterations=2)
#
#     cnts = cv2.findContours(dilated.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
#     cnts = imutils.grab_contours(cnts)
#     cnts = sort_contours(cnts, method="top-to-bottom")[0]
#     # loop over the contours
#     for c in cnts:
#         if cv2.contourArea(c) > 10:
#             (x, y, w, h) = cv2.boundingRect(c)
#             # x-=5
#             # y-=5
#             # w+=10
#             # h+=10
#             # cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
#         roi = gray[y:y + h, x:x + w]
#         thresh = cv2.threshold(roi, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]
#         thresh = cv2.resize(thresh, (32, 32), interpolation=cv2.INTER_CUBIC)
#         thresh = thresh.astype("float32") / 255.0
#         thresh = np.expand_dims(thresh, axis=-1)
#         thresh = thresh.reshape(1, 32, 32, 1)
#         ypred = model.predict(thresh)
#         print(np.argmax(ypred))
#         ypred = np.argmax(ypred)
#         letters.append(labels[ypred])
#     return letters, image
# #
# #
# def get_word(letter):
#     word = "".join(letter)
#     return word
# #
# #
# letter, image = get_letters("A.png")
# word = get_word(letter)
# print(word)
# plt.imshow(image)
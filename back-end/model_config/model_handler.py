import cv2
import imutils
import numpy as np
from keras.models import load_model


class ModelConfig:
    def __init__(self, image_path):
        self.model = load_model('model_config/model.h5')
        self.image = cv2.imread(image_path)
        self.labels = self.get_labels()
        self.predicted = {}

    @staticmethod
    def get_labels():
        with open("model_config/labels.txt", 'r') as label_file:
            return label_file.read().splitlines()

    @staticmethod
    def sort_contours(contours, method="left-to-right"):
        reverse = False
        i = 0
        if method == "right-to-left" or method == "bottom-to-top":
            reverse = True
        if method == "top-to-bottom" or method == "bottom-to-top":
            i = 1
        bounding_boxes = [cv2.boundingRect(c) for c in contours]
        (contours, bounding_boxes) = zip(*sorted(zip(contours, bounding_boxes), key=lambda b: b[1][i], reverse=reverse))

        return contours, bounding_boxes

    def get_letters(self):
        y, h, x, w = None, None, None, None
        gray = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)
        ret, thresh1 = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)
        dilated = cv2.dilate(thresh1, None, iterations=2)

        contours = cv2.findContours(dilated.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        contours = imutils.grab_contours(contours)
        contours = self.sort_contours(contours, method="top-to-bottom")[0]
        # loop over the contours
        for c in contours:
            if cv2.contourArea(c) > 10:
                (x, y, w, h) = cv2.boundingRect(c)
            roi = gray[y:y + h, x:x + w]
            thresh = cv2.threshold(roi, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]
            thresh = cv2.resize(thresh, (32, 32), interpolation=cv2.INTER_CUBIC)
            thresh = thresh.astype("float32") / 255.0
            thresh = np.expand_dims(thresh, axis=-1)
            thresh = thresh.reshape(1, 32, 32, 1)
            pred = self.model.predict(thresh)
            pred = np.argmax(pred)
            label = self.labels[pred]
            if label in self.predicted:
                self.predicted.update({label: self.predicted[label]+[thresh]})
            else:
                self.predicted.update({label: [thresh]})
        return self.predicted


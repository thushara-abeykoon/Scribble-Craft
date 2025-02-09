import cv2
import imutils
import numpy as np
from keras.api.models import load_model
from keras.api.preprocessing.image import img_to_array


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

    def get_predictions(self):
        for thresh_value in range(50, 240, 2):
            gray = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)  # Convert to grayscale
            _, binary = cv2.threshold(gray, thresh_value, 255, cv2.THRESH_BINARY_INV)  # Apply binary thresholding

            # Optional: Use morphological operations to clean up noise
            kernel = np.ones((3, 3), np.uint8)
            binary = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel)

            # Find contours
            contours = cv2.findContours(binary.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            contours = imutils.grab_contours(contours)
            contours = self.sort_contours(contours, method="top-to-bottom")[0]

            # Loop over the contours
            for c in contours:
                if cv2.contourArea(c) > 10:
                    (x, y, w, h) = cv2.boundingRect(c)

                    # Make the bounding box a square
                    size = max(w, h)  # Use the larger dimension as the size of the square
                    x_new = x + (w - size) // 2
                    y_new = y + (h - size) // 2

                    # Ensure the new bounding box stays within the image boundaries
                    x_new = max(x_new, 0)
                    y_new = max(y_new, 0)
                    if x_new + size > self.image.shape[1]:  # Check if square exceeds image width
                        size = self.image.shape[1] - x_new
                    if y_new + size > self.image.shape[0]:  # Check if square exceeds image height
                        size = self.image.shape[0] - y_new

                    # Crop the character using the square bounding box
                    roi = gray[y_new:y_new + size, x_new:x_new + size]

                    # Threshold and resize the ROI
                    thresh = self.thresh_hold_and_resize_image(roi, thresh_value)

                    # Predict the character
                    pred = self.model.predict(thresh)
                    confidence_scores = np.max(pred, axis=1)
                    confidence_index = np.argmax(confidence_scores)

                    if confidence_scores[confidence_index] < 0.70:
                        continue

                    pred = np.argmax(pred)
                    label = self.labels[pred]

                    # Update the predicted dictionary
                    if label in self.predicted:
                        self.predicted[label].append(roi)
                    else:
                        self.predicted[label] = [roi]

        return self.predicted

    # def get_predictions(self):
    #     for thresh_value in range(50, 240, 2):
    #         y, h, x, w = None, None, None, None
    #         gray = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)
    #         ret, thresh1 = cv2.threshold(gray, thresh_value, 255, cv2.THRESH_BINARY_INV)
    #         dilated = cv2.dilate(thresh1, None, iterations=2)
    #         contours = cv2.findContours(dilated.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    #         contours = imutils.grab_contours(contours)
    #         contours = self.sort_contours(contours, method="top-to-bottom")[0]
    #         # loop over the contours
    #         for c in contours:
    #             if cv2.contourArea(c) > 10:
    #                 (x, y, w, h) = cv2.boundingRect(c)
    #             roi = gray[y:y + h, x:x + w]
    #
    #             thresh = self.thresh_hold_and_resize_image(roi, thresh_value)
    #
    #             pred = self.model.predict(thresh)
    #
    #             confidence_scores = np.max(pred, axis=1)
    #             confidence_index = np.argmax(confidence_scores)
    #             if confidence_scores[confidence_index] < 0.90:
    #                 continue
    #
    #             pred = np.argmax(pred)
    #             label = self.labels[pred]
    #             if label in self.predicted:
    #                 self.predicted.update({label: self.predicted[label] + [roi]})
    #             else:
    #                 self.predicted.update({label: [roi]})
    #     return self.predicted

    @staticmethod
    def thresh_hold_and_resize_image(image, thresh_value):
        thresh = cv2.threshold(image, thresh_value, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]
        thresh = cv2.resize(thresh, (32, 32), interpolation=cv2.INTER_CUBIC)
        thresh = thresh.astype("float32") / 255.0
        thresh = np.expand_dims(thresh, axis=-1)
        return thresh.reshape(1, 32, 32, 1)


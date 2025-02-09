import cv2
import numpy as np
import os

output_folder = "output"
input_folder = "character_images"

if not os.path.exists(output_folder):
    os.mkdir(output_folder)

def crop_images(image_path):
    necessary_dir_path = os.path.join(output_folder, image_path.split('.')[0])

    print(necessary_dir_path)

    if not os.path.exists(necessary_dir_path):
        os.mkdir(necessary_dir_path)

    image = cv2.imread(os.path.join(input_folder, image_path))

    for thresh in range(100, 240, 2):
        # Step 2: Preprocess the image
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)  # Convert to grayscale
        _, binary = cv2.threshold(gray, thresh, 255, cv2.THRESH_BINARY_INV)  # Apply binary thresholding

        # Optional: Use morphological operations to clean up noise
        kernel = np.ones((3, 3), np.uint8)
        binary = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel)

        # Step 3: Find contours
        contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        # Step 4: Crop and save characters (ignore small contours and ensure exact squares)
        min_size = 30  # Minimum size (width or height) to consider
        for i, contour in enumerate(contours):
            # Get bounding box for each contour
            x, y, w, h = cv2.boundingRect(contour)

            # Ignore small contours (less than min_size in width or height)
            if w < min_size or h < min_size:
                continue

            # Make the bounding box a square
            size = max(w, h)  # Use the larger dimension as the size of the square
            # Calculate new x and y to center the character in the square
            x_new = x + (w - size) // 2
            y_new = y + (h - size) // 2

            # Ensure the new bounding box stays within the image boundaries
            x_new = max(x_new, 0)
            y_new = max(y_new, 0)
            if x_new + size > image.shape[1]:  # Check if square exceeds image width
                size = image.shape[1] - x_new
            if y_new + size > image.shape[0]:  # Check if square exceeds image height
                size = image.shape[0] - y_new

            # Crop the character using the square bounding box
            character = image[y_new:y_new + size, x_new:x_new + size]

            # Save the cropped character
            cv2.imwrite(f'{necessary_dir_path}/character_{i}.png', character)

            # Optional: Draw bounding boxes on the original image for visualization
            # cv2.rectangle(image, (x_new, y_new), (x_new + size, y_new + size), (0, 255, 0), 2)

        # Save or display the original image with bounding boxes
        # cv2.imwrite('sample/output_with_boxes.png', image)
        # cv2.imshow('Output', image)

for image_name in os.listdir(input_folder):
    crop_images(image_name)
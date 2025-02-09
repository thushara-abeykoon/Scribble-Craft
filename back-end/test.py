import cv2
from PIL import Image

from manual_config.image_config import enhance_image, remove_background

# enhance image
image = cv2.imread('users/thushara2@gmail.com/automatic/uploads/A.png')
image = enhance_image(image)

image = remove_background(image)
image.save('output.png', 'PNG')
# cv2.imwrite('output.png', image)

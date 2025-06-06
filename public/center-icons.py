import os
from PIL import Image

def center_image(image):
    # Convert image to RGBA
    img = image.convert("RGBA")
    width, height = img.size

    # Get pixel data
    pixels = img.load()

    # Compute weighted center of mass of non-transparent pixels
    total_alpha = 0
    x_sum = 0
    y_sum = 0
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a > 0:
                total_alpha += a
                x_sum += x * a
                y_sum += y * a

    if total_alpha == 0:
        # Fully transparent, no need to center
        return img

    # Center of mass
    x_center = x_sum / total_alpha
    y_center = y_sum / total_alpha

    # Calculate offset to move content to center of the canvas
    x_offset = int((width / 2) - x_center)
    y_offset = int((height / 2) - y_center)

    # Create new transparent image
    new_img = Image.new('RGBA', (width, height), (0, 0, 0, 0))

    # Paste the image centered at the new position
    new_img.paste(img, (x_offset, y_offset))

    return new_img

for filename in os.listdir('.'):
    if filename.lower().endswith(('.png', '.ico')):
        print(f'Processing {filename}...')
        img = Image.open(filename).convert("RGBA")
        centered_img = center_image(img)

        # Replace original file
        centered_img.save(filename)
        print(f'Saved centered {filename}')

print('Done! 🎉')

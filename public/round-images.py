import os
from PIL import Image, ImageDraw

def add_rounded_border(image, radius):
    # Create a mask for rounded corners
    mask = Image.new('L', image.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([0, 0, image.size[0], image.size[1]], radius=radius, fill=255)

    # Create a new transparent image
    rounded = Image.new('RGBA', image.size, (0, 0, 0, 0))

    # Paste the image using the rounded mask
    rounded.paste(image, (0, 0), mask=mask)

    return rounded

radius = 8

for filename in os.listdir('.'):
    if filename.lower().endswith(('.png', '.ico')):
        print(f'Processing {filename}...')
        img = Image.open(filename).convert("RGBA")
        rounded_img = add_rounded_border(img, radius)

        # Remove the original file
        os.remove(filename)
        print(f'Deleted original {filename}')

        # Save the rounded image using the original filename
        rounded_img.save(filename)
        print(f'Saved new {filename}')

print('Done! 🎉')

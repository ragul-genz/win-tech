from PIL import Image

def remove_black_bg(input_path, output_path):
    # Open the image and convert to RGBA
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    # Threshold for what is considered "black"
    threshold = 30
    
    for item in datas:
        # Check if pixel is close to black (R, G, B < threshold)
        if item[0] < threshold and item[1] < threshold and item[2] < threshold:
            # Change the black pixel to transparent
            newData.append((0, 0, 0, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")

remove_black_bg("public/logo_black.jpg", "public/logo.png")
print("Done processing image!")

from PIL import Image
import sys

def remove_background(input_path, output_path):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    # Assume the top-left pixel is the background color
    bg_color = datas[0]
    
    # Define a tolerance for "close enough" colors (e.g., anti-aliasing)
    tolerance = 30 
    
    new_data = []
    for item in datas:
        # Check if the pixel is close to the background color
        if all(abs(item[i] - bg_color[i]) < tolerance for i in range(3)):
            new_data.append((255, 255, 255, 0)) # Transparent
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 remove_bg.py input_path output_path")
    else:
        remove_background(sys.argv[1], sys.argv[2])

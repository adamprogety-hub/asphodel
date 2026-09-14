from PIL import Image
import sys

def convert_to_transparent(input_path, output_path):
    img = Image.open(input_path).convert('RGBA')
    datas = img.getdata()
    newData = []
    for item in datas:
        if item[0] > 246 and item[1] > 246 and item[2] > 246:
            newData.append((255, 255, 255, 0))
        elif item[0] > 230 and item[1] > 230 and item[2] > 230:
            avg = (item[0] + item[1] + item[2]) / 3.0
            alpha = int((255.0 - avg) / (255.0 - 230.0) * 255.0)
            newData.append((item[0], item[1], item[2], max(0, min(255, alpha))))
        else:
            newData.append(item)
    img.putdata(newData)
    img.save(output_path, 'PNG')
    print(f"Saved: {output_path}")

if __name__ == '__main__':
    convert_to_transparent(sys.argv[1], sys.argv[2])

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import HTMLResponse
from pathlib import Path
import os


app = FastAPI()

# 设置图像保存的目录
IMAGES_DIR = "images"
os.makedirs(IMAGES_DIR, exist_ok=True)

@app.get("/")
def read_root():
    return HTMLResponse('''
    <h1>Upload an image</h1>
    <form action="/upload-image" enctype="multipart/form-data" method="post">
        <input name="image" type="file">
        <input type="submit">
    </form>
    ''')

@app.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    # 构造文件的保存路径
    save_path = Path(IMAGES_DIR) / Path(file.filename)
    with open(save_path, "wb+") as f:
        f.write(await file.read())
    return {"info": f"file {file.filename} saved at {save_path}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
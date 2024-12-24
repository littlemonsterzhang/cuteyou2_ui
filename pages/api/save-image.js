// pages/api/save-image.js
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false, // 关闭 Next.js 的内置 body 解析
  },
};

const uploadDir = path.join(process.cwd(), 'A'); // 保存图片的目录

// 确保目录存在
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    
    form.uploadDir = uploadDir; // 设置上传目录
    form.keepExtensions = true; // 保留文件扩展名

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(500).json({ message: 'File upload failed', error: err });
        return;
      }

      const uploadedFile = files.file; // 确保这里的 'file' 与前端发送的字段名一致
      const oldPath = uploadedFile.path; // 临时上传的路径
      const newPath = path.join(uploadDir, uploadedFile.name); // 保存路径

      // 将文件从临时路径移动到指定目录
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          res.status(500).json({ message: 'File saving failed', error: oldPath });
          return;
        }

        res.status(200).json({ message: 'Image saved successfully' });
      });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

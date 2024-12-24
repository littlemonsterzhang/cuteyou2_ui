// pages/api/save-image.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    // 处理保存图片的逻辑
    res.status(200).json({ message: 'Image saved successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

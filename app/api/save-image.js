// pages/api/save-image.js
import { IncomingForm } from 'formidable'
import fs from 'fs'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const form = new IncomingForm()

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing form data' })
    }

    const file = files.file[0]
    const oldPath = file.filepath
    const fileName = file.originalFilename
    const newPath = path.join(process.cwd(), 'public', 'uploads', fileName)

    try {
      await fs.promises.copyFile(oldPath, newPath)
      res.status(200).json({ message: 'File saved successfully', path: `/uploads/${fileName}` })
    } catch (error) {
      console.error('Error saving file:', error)
      res.status(500).json({ error: 'Error saving file' })
    }
  })
}
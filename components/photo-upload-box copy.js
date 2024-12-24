"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadCloud, CheckCircle, AlertCircle } from "lucide-react"
import React, { useState } from 'react';



export default function PhotoUploadBox() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setError(null)
      setSuccess(false)
    }
  }

  const handleUpload = async () => {
    if (!selectedImage) {
      setError("Please select an image first.")
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(false)

    const formData = new FormData()
    formData.append('file', selectedImage)

    try {
      const response = await fetch('http://127.0.0.1:8000/upload/', {
        method: 'POST',
        body: formData,
      })
      console.log('123')
      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(`Upload failed: ${response.status} ${response.statusText}. Server response: ${errorData}`)
      }

      const data = await response.json()
      console.log('Upload successful:', data)
      setSuccess(true)
    } catch (err) {
      console.error('Detailed upload error:', err)
      setError(`Failed to upload image: ${err.message}`)

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Image Upload</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center w-full">
          <label htmlFor="imageInput" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <Input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
        {selectedImage && (
          <div className="text-sm text-gray-600">
            Selected: {selectedImage.name}
          </div>
        )}
        {error && (
          <div className="flex items-center text-red-500 text-sm">
            <AlertCircle className="w-4 h-4 mr-2" />
            {error}
          </div>
        )}
        {success && (
          <div className="flex items-center text-green-500 text-sm">
            <CheckCircle className="w-4 h-4 mr-2" />
            Image uploaded successfully!
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleUpload} 
          disabled={!selectedImage || isLoading}
          className="w-full"
        >
          {isLoading ? 'Uploading...' : 'Upload Image'}
        </Button>
      </CardFooter>
    </Card>
  )
}
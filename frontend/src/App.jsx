import { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/api/upload', formData);
      setImages([...images, response.data.imageUrl]);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">MERN Image Uploader</h1>
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="image-upload">
              Upload Image
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image-upload" type="file" onChange={handleImageUpload} />
          </div>
          {selectedImage && (
            <div className="mb-4">
              <img className="max-w-xs mx-auto" src={URL.createObjectURL(selectedImage)} alt="Selected" />
            </div>
          )}
        </div>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h2 className="text-2xl font-bold mb-4">Uploaded Images</h2>
          <div className="grid grid-cols-3 gap-4">
            {images.map((imageUrl, index) => (
              <img key={index} className="max-w-xs" src={imageUrl} alt={`Image ${index}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;

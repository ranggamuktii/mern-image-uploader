import { useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  // const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('image', selectedImage);
      await axios.post(BASE_URL + `/api/upload`, formData);
      setSelectedImage(null);
      inputRef.current.value = '';
      toast.success('Image uploaded successfully!', { position: 'top-center' });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-xl">
        <div className="bg-white shadow-sm rounded-xl px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl font-semibold mb-4 text-center">Upload Gambar Anda</h1>
          <div className="mb-4">
            <div className="relative w-full">
              <label htmlFor="image-upload" className="block text-gray-800 font-semibold mb-2 cursor-pointer">
                <div className="w-full h-48 flex items-center justify-center px-4 py-4 bg-gray-50 text-gray-400 border-2 border-gray-300 border-dashed rounded-xl hover:bg-gray-100 hover:text-gray-600">
                  {selectedImage ? (
                    <img className="w-28 h-28 object-cover rounded-xl" src={URL.createObjectURL(selectedImage)} alt="Selected" />
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span>Upload Gambar</span>
                    </>
                  )}
                </div>
              </label>
              <input id="image-upload" type="file" className="sr-only" onChange={(e) => setSelectedImage(e.target.files[0])} ref={inputRef} />
            </div>
          </div>
          <div className="space-y-4">
            <button className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl  ${isLoading ? 'cursor-not-allowed' : ''}`} type="button" onClick={handleImageUpload} disabled={isLoading}>
              {isLoading ? 'Uploading...' : 'Upload'}
            </button>
            <button className="w-full bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-xl" type="button" onClick={() => navigate('/uploaded-images')}>
              View Uploaded Images
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;

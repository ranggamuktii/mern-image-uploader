import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(BASE_URL + `/api/images`);
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('image', selectedImage);
      await axios.post(BASE_URL + `/api/upload`, formData);
      setSelectedImage(null);
      inputRef.current.value = '';
      const response = await axios.get(BASE_URL + `/api/images`);
      setImages(response.data);
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
      <h1 className="text-3xl font-bold mb-8">MERN Image Uploader</h1>
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="image-upload">
              Upload Image
            </label>
            {selectedImage && selectedImage instanceof File && (
              <div className="mb-4">
                <img className="w-20 h-20 mx-auto" src={URL.createObjectURL(selectedImage)} alt="Selected" />
              </div>
            )}
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="image-upload"
              type="file"
              onChange={(e) => setSelectedImage(e.target.files[0])}
              ref={inputRef}
            />
          </div>
          <button
            className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'cursor-not-allowed' : ''}`}
            type="button"
            onClick={handleImageUpload}
            disabled={isLoading}
          >
            {isLoading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h2 className="text-2xl font-bold mb-4">Uploaded Images</h2>
          <div className="w-full grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <img key={index} className="w-full" src={new URL(image.imageUrl, BASE_URL).toString()} alt={`Image ${index}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;

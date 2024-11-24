import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const UploadedImages = () => {
  const [images, setImages] = useState([]);

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

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-sm rounded-xl px-8 pt-6 pb-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Uploaded Images</h2>
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <img key={index} className="bg-white shadow-md p-6 w-full h-full object-cover rounded-xl" src={new URL(image.imageUrl, BASE_URL).toString()} alt={`Image ${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadedImages;

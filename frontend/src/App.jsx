import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImageUploader from './components/ImageUploader.jsx';
import UploadedImagesPage from './components/UploadedImages.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ImageUploader />} />
        <Route path="/uploaded-images" element={<UploadedImagesPage />} />
      </Routes>
    </Router>
  );
}

export default App;

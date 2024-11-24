const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const connectToMongoDB = require('./config/mongodb');
const Image = require('./models/Image');

const app = express();
const port = process.env.PORT;

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize Multer with the storage configuration
const upload = multer({ storage });

app.use(express.json());
app.use(cors());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
connectToMongoDB();

// Image upload endpoint
app.post('/api/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  const newImage = new Image({
    filename: req.file.filename,
    imageUrl,
  });

  try {
    await newImage.save();
    res.json({ imageUrl });
  } catch (error) {
    console.error('Error saving image to MongoDB:', error);
    res.status(500).json({ error: 'Error uploading image' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

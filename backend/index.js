import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import connectToMongoDB from './config/mongodb.js';
import Image from './models/Image.js';

const app = express();
const port = process.env.PORT;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.resolve('uploads')));

connectToMongoDB();

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

app.get('/api/images', async (req, res) => {
  try {
    const images = await Image.find({});
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Error fetching images' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

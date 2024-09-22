import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import employeeRoutes from './src/routers/employeeRouter';
import dutyRoasterRouter from './src/routers/dutyRoasterRouter';
import chatRouter from './src/routers/chatRouter';
import noticesRouter from './src/routers/noticesRouter';
import leaveRequestRouter from './src/routers/leaveRequestRouter';
import roomRouter from './src/routers/roomRouter';
import menuItemRouter from './src/routers/menuItemRouter';
import transportBookingRouter from './src/routers/transportBookingRouter'; // Import transport routes
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import driverRouter from './src/routers/driverRouter'; 
import feedbackRouter from './src/routers/feedbackRouter'; 
import offerRouter from './src/routers/offerRouter'; 
import appointmentRoutes from './src/routers/appointmentRoutes';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173', // Update with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

// Middleware
app.use(express.json());
app.use('/uploads', express.static(uploadsDir)); // Serve static files from uploads directory

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Use uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name to avoid duplicates
  },
});
const upload = multer({ storage });

// Routes
app.use('/employees', employeeRoutes); 
app.use('/api/duty-roaster', dutyRoasterRouter); 
app.use('/api', chatRouter);
app.use('/api/notices', noticesRouter);
app.use('/api', leaveRequestRouter);
app.use('/api', roomRouter);
app.use('/api/menu-items', menuItemRouter);
app.use('/api/TransportBooking', transportBookingRouter); // New route for transport bookings
app.use('/api', driverRouter);
app.use('/api', feedbackRouter); 
app.use('/api/offers', offerRouter); 
app.use('/api/appointments', appointmentRoutes);
// Image upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  const imageUrl = `http://localhost:${process.env.PORT || 5000}/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// Database Connection
const dbUri = process.env.MONGO_URI || 'mongodb://localhost:27017/test'; // Use env variable for DB URI
mongoose.connect(dbUri)
  .then(() => {
    console.log('MongoDB connection successful');
    // Start Server after successful DB connection
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

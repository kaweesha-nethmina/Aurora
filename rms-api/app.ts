// src/app.ts (or server.ts)
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import employeeRoutes from './src/routers/employeeRouter';
import dutyRoasterRouter from './src/routers/dutyRoasterRouter';
import dotenv from 'dotenv';
import chatRouter from './src/routers/chatRouter';
import noticesRouter from './src/routers/noticesRouter';
import leaveRequestRouter from './src/routers/leaveRequestRouter';
import roomRouter from './src/routers/roomRouter';


dotenv.config();

const app = express();

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

// Middleware
app.use(express.json());

// Routes
app.use('/employees', employeeRoutes); // Employee routes
app.use('/api/duty-roaster', dutyRoasterRouter); // Duty roaster routes
app.use('/api', chatRouter);
app.use('/api/notices', noticesRouter);
app.use('/api', leaveRequestRouter);
app.use('/api', roomRouter);
// Database Connection
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test'; // Use environment variable if available
mongoose.connect(dbUri)
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

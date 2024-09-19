import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import employeeRoutes from './src/routers/employeeRouter'; // Adjust path as necessary
import dutyRoasterRouter from './src/routers/dutyRoasterRouter';
import chatRouter from './src/routers/chatRouter';
import noticesRouter from './src/routers/noticesRouter';
import leaveRequestRouter from './src/routers/leaveRequestRouter';
import roomRouter from './src/routers/roomRouter';


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
app.use('/employees', employeeRoutes); // Prefix routes with /employees
app.use('/api/duty-roaster', dutyRoasterRouter); 
app.use('/api', chatRouter);
app.use('/api/notices', noticesRouter);
app.use('/api', leaveRequestRouter);
app.use('/api', roomRouter);

// Database Connection
const dbUri = 'mongodb://localhost:27017/test'; // Update with your database name
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

import express from 'express';
import { createBooking, getAllBookings, cancelBookings } from '../controller/transportBookingController';

const router = express.Router();

// POST /api/TransportBooking/bookings - Create a new booking
router.post('/bookings', createBooking);

// GET /api/TransportBooking/bookings - Get all bookings
router.get('/bookings', getAllBookings);

// POST /api/TransportBooking/bookings/cancel - Cancel selected bookings
router.post('/bookings/cancel', cancelBookings);

export default router;

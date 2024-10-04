import express from 'express';
import { createBooking, getAllBookings, getBookingById, deleteBooking, acceptBooking, rejectBooking, getBookingsPerMonth } from '../controller/RoomBookingController';

const router = express.Router();

// Create a booking
router.post('/bookings', createBooking);

// Get all bookings
router.get('/bookings', getAllBookings);

// Get a booking by ID
router.get('/bookings/:id', getBookingById);

// Delete a booking
router.delete('/bookings/:id', deleteBooking);

// Accept a booking
router.put('/bookings/:id/accept', acceptBooking);

// Reject a booking
router.put('/bookings/:id/reject', rejectBooking);

router.get('/bookings-per-month', getBookingsPerMonth);


export default router;

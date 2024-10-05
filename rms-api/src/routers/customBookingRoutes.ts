import { Router } from 'express';
import { createBooking, deleteBooking, getAllBookings, updateBooking } from '../controller/customBookingController';

const router = Router();

// Route to create a new booking
router.post('/customBookings', createBooking);

// Route to get all bookings
router.get('/customBookings', getAllBookings);

// Route to delete a booking by ID
router.delete('/customBookings/:id', deleteBooking);

// Route to update a booking by ID
router.put('/customBookings/:id', updateBooking); 

export default router;

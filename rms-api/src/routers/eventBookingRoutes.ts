import express from 'express';
import { addEventBooking, deleteEventBooking, getAllEventBookings } from '../controller/eventBookingController';

const router = express.Router();

// POST /api/eventbookings - Add a new booking
router.post('/', addEventBooking);

// GET /api/eventbookings - Get all bookings
router.get('/', getAllEventBookings);

// DELETE /api/eventbookings/:id - Delete a booking by ID
router.delete('/:id', deleteEventBooking); // Make sure the route is defined as '/:id'

export default router;

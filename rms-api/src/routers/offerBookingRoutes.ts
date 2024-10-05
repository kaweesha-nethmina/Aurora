import express from 'express';
import {
  createOfferBooking,
  getOfferBookings,
  acceptOfferBooking,
  rejectOfferBooking,
  deleteOfferBooking,
  updateOfferBooking
} from '../controller/offerBookingController';

const router = express.Router();

// Create a new booking
router.post('/', createOfferBooking);

// Get all bookings
router.get('/', getOfferBookings);

// Accept a booking
router.put('/:id/accept', acceptOfferBooking);

// Reject a booking
router.put('/:id/reject', rejectOfferBooking);

// Delete a booking
router.delete('/:id', deleteOfferBooking);

// Update a booking by ID
router.put('/:id', updateOfferBooking);


export default router;

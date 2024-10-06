import { Router } from 'express';
import {
  createBooking,
  getAllBookings,
  approveTransportBooking,
  rejectTransportBooking,
  deleteBooking,
  setBookingPrice,
  payTransportBooking, // Import the new controller function
} from '../controller/transportBookingController';

const router = Router();

// POST /api/TransportBooking/bookings - Create a new booking
router.post('/bookings', createBooking);

// GET /api/TransportBooking/bookings - Get all bookings
router.get('/bookings', getAllBookings);

// PUT /api/TransportBooking/approve/:id - Approve a booking
router.put('/approve/:id', approveTransportBooking);

// PUT /api/TransportBooking/reject/:id - Reject a booking
router.put('/reject/:id', rejectTransportBooking);

// DELETE /api/TransportBooking/bookings/:id - Delete a booking
router.delete('/bookings/:id', deleteBooking);

// PUT /api/TransportBooking/setPrice/:id - Set the price for a booking
router.put('/setPrice/:id', setBookingPrice); // New route for setting the price

router.put('/pay/:id', payTransportBooking); 

export default router;

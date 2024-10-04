import express from 'express';
import {
  createTableReservation,
  getTableReservations,
  getTableReservationById,
  acceptTableReservation,
  rejectTableReservation
} from '../controller/TablereservationController';

const router = express.Router();

// Route to create a new reservation
router.post('/', createTableReservation);

// Route to get all reservations
router.get('/', getTableReservations);

// Route to get a reservation by ID
router.get('/:id', getTableReservationById);

// Route to accept a reservation
router.put('/:id/accept', acceptTableReservation);

// Route to reject a reservation
router.put('/:id/reject', rejectTableReservation);

export default router;
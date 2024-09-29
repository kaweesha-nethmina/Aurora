import { Request, Response } from 'express';
import TableReservationModel from '../model/TablereservationModel';

// Create a new table reservation
export const createTableReservation = async (req: Request, res: Response) => {
  try {
    const reservation = new TableReservationModel(req.body);
    const savedReservation = await reservation.save();
    return res.status(201).json(savedReservation);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create reservation', error });
  }
};

// Get all reservations
export const getTableReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await TableReservationModel.find();
    return res.status(200).json(reservations);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve reservations', error });
  }
};

// Get reservation by ID
export const getTableReservationById = async (req: Request, res: Response) => {
  try {
    const reservation = await TableReservationModel.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    return res.status(200).json(reservation);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve reservation', error });
  }
};

// Accept a reservation
export const acceptTableReservation = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const updatedReservation = await TableReservationModel.findByIdAndUpdate(
      id,
      { status: 'accepted' },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    return res.status(200).json(updatedReservation);
  } catch (error) {
    console.error('Error accepting reservation:', error);
    return res.status(500).json({ message: 'Failed to update reservation', error });
  }
};

// Reject a reservation
export const rejectTableReservation = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const updatedReservation = await TableReservationModel.findByIdAndUpdate(
      id,
      { status: 'rejected' },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    return res.status(200).json(updatedReservation);
  } catch (error) {
    console.error('Error rejecting reservation:', error);
    return res.status(500).json({ message: 'Failed to update reservation', error });
  }
};

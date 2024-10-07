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

// Get monthly reservations
export const getMonthlyReservations = async (req: Request, res: Response) => {
  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

  console.log('Fetching reservations from:', startOfMonth, 'to:', endOfMonth);

  try {
    const reservations = await TableReservationModel.find({
      arrivalDate: { $gte: startOfMonth, $lte: endOfMonth }
    });

    console.log('Reservations found:', reservations); // Log fetched reservations

    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: 'No reservations found for this month' });
    }

    // Process data to count reservations per month
    const counts: { [key: string]: number } = {};

    reservations.forEach((reservation) => {
      const date = new Date(reservation.arrivalDate);
      const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
      
      // Initialize if not present
      if (!counts[monthYear]) {
        counts[monthYear] = 0; // Initialize count
      }
      counts[monthYear] += 1; // Increment count
    });

    // Convert counts object to an array
    const monthlyReport = Object.entries(counts).map(([month, count]) => ({
      month,
      count,
      year: new Date(month).getFullYear(), // Extract year from the month string
    }));

    return res.status(200).json(monthlyReport);
  } catch (error) {
    console.error('Error fetching monthly reservations:', error);
    return res.status(500).json({ message: 'Failed to retrieve monthly reservations', error });
  }
};


// Delete a table reservation
export const deleteTableReservation = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedReservation = await TableReservationModel.findByIdAndDelete(id);

    if (!deletedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    return res.status(200).json({ message: 'Reservation deleted successfully', deletedReservation });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    return res.status(500).json({ message: 'Failed to delete reservation', error });
  }
};

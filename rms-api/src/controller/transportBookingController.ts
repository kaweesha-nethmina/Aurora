import { Request, Response } from 'express';
import TransportBooking, { ITransportBooking } from '../model/TransportBooking';

// Create a new booking
export const createBooking = async (req: Request, res: Response) => {
  try {
    const bookingData: ITransportBooking = req.body;
    const newBooking = new TransportBooking(bookingData);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

// Get all bookings
export const getAllBookings = async (req: Request, res: Response) => {
  try {
    console.log('Fetching all bookings...'); // Add this line
    const bookings = await TransportBooking.find();
    console.log('Bookings retrieved:', bookings); // Add this line
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error retrieving bookings:', error); // Log the error
    res.status(500).json({ message: 'Error retrieving bookings', error });
  }
};



// Cancel selected bookings
export const cancelBookings = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;
    await TransportBooking.updateMany(
      { _id: { $in: ids } },
      { $set: { status: 'canceled' } }
    );
    res.json({ message: 'Bookings canceled successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel bookings' });
  }
};

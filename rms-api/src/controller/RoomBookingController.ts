import { Request, Response } from 'express';
import RoomBooking from '../model/RoomBooking';

// Create a new room booking
export const createBooking = async (req: Request, res: Response) => {
  try {
    const { roomType, arrivalDate, departureDate, specialRequests, paymentMethod, cardNumber, expirationDate, cvv, email } = req.body;

    const newBooking = new RoomBooking({
      roomType,
      arrivalDate,
      departureDate,
      specialRequests,
      paymentMethod,
      cardNumber,
      expirationDate,
      cvv,
      email, // Save the email
      status: 'Pending', // Set initial status
    });

    await newBooking.save();
    res.status(201).json(newBooking); // Send back the created booking
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking' });
  }
};

// Get all bookings or filter by email
export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const { email } = req.query; // Get the email from query parameters
    const filter = email ? { email } : {}; // Create filter object

    const bookings = await RoomBooking.find(filter); // Apply filter
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};

// Get a single booking by ID
export const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await RoomBooking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking', error });
  }
};

// Delete a booking
export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const booking = await RoomBooking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking', error });
  }
};

// Accept a room booking
export const acceptBooking = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const updatedBooking = await RoomBooking.findByIdAndUpdate(
      id,
      { status: 'accepted' },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    return res.status(200).json(updatedBooking);
  } catch (error) {
    console.error('Error accepting booking:', error);
    return res.status(500).json({ message: 'Failed to update booking', error });
  }
};

// Reject a room booking
export const rejectBooking = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const updatedBooking = await RoomBooking.findByIdAndUpdate(
      id,
      { status: 'rejected' },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    return res.status(200).json(updatedBooking);
  } catch (error) {
    console.error('Error rejecting booking:', error);
    return res.status(500).json({ message: 'Failed to update booking', error });
  }
};

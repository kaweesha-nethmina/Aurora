import { Request, Response } from 'express';
import TransportBooking from '../model/TransportBooking';

// Create a new booking
export const createBooking = async (req: Request, res: Response) => {
  try {
    const newBooking = new TransportBooking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create booking', error });
  }
};

// Get all bookings
export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await TransportBooking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    res.status(500).json({ message: 'Error retrieving bookings', error });
  }
};

// Approve a transport booking
export const approveTransportBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedBooking = await TransportBooking.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
    if (updatedBooking) {
      res.status(200).json(updatedBooking);
    } else {
      res.status(404).json({ message: 'Transport booking not found' });
    }
  } catch (error) {
    console.error('Error approving booking:', error);
    res.status(500).json({ message: 'Failed to approve booking', error });
  }
};

// Reject a transport booking
export const rejectTransportBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedBooking = await TransportBooking.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });
    if (updatedBooking) {
      res.status(200).json(updatedBooking);
    } else {
      res.status(404).json({ message: 'Transport booking not found' });
    }
  } catch (error) {
    console.error('Error rejecting booking:', error);
    res.status(500).json({ message: 'Failed to reject booking', error });
  }
};

// Delete a booking
export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedBooking = await TransportBooking.findByIdAndDelete(id);
    if (deletedBooking) {
      res.status(200).json({ message: 'Booking deleted successfully' });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Failed to delete booking', error });
  }
};

// Set the price for a booking
export const setBookingPrice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { price } = req.body; // Get the price from the request body
    const updatedBooking = await TransportBooking.findByIdAndUpdate(id, { price }, { new: true });
    if (updatedBooking) {
      res.status(200).json(updatedBooking);
    } else {
      res.status(404).json({ message: 'Transport booking not found' });
    }
  } catch (error) {
    console.error('Error setting booking price:', error);
    res.status(500).json({ message: 'Failed to set booking price', error });
  }
};


// Update payment status of a booking
export const payTransportBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedBooking = await TransportBooking.findByIdAndUpdate(
      id, 
      { paymentStatus: 'success' }, 
      { new: true }
    );
    
    if (updatedBooking) {
      res.status(200).json(updatedBooking);
    } else {
      res.status(404).json({ message: 'Transport booking not found' });
    }
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ message: 'Failed to update payment status', error });
  }
};

import { Request, Response } from 'express';
import CustomBookingModel from '../model/customBooking'; // Ensure this import points to the correct model

// Create Booking
export const createBooking = async (req: Request, res: Response) => {
  try {
    const newBooking = new CustomBookingModel(req.body);
    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error: unknown) {  // Specify 'unknown' type for error
    console.error('Error creating booking:', error);
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error occurred'; // Use type guard
    res.status(500).json({ message: 'Error creating booking', error: errorMessage });
  }
};

// Get All Bookings
export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await CustomBookingModel.find();
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found' }); // Handle no bookings case
    }
    res.status(200).json({ bookings }); // Wrap the bookings in an object
  } catch (error: unknown) {  // Specify 'unknown' type for error
    console.error('Error retrieving bookings:', error);
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error occurred'; // Use type guard
    res.status(500).json({ message: 'Error retrieving bookings', error: errorMessage });
  }
};

// Delete Booking
export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await CustomBookingModel.findByIdAndDelete(id);
    
    if (!result) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error: unknown) {  // Specify 'unknown' type for error
    console.error('Error deleting booking:', error);
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error occurred'; // Use type guard
    res.status(500).json({ message: 'Error deleting booking', error: errorMessage });
  }
};

// Update Booking
export const updateBooking = async (req: Request, res: Response) => {
  const { id } = req.params; // Get ID from the URL
  const updatedData = req.body; // Get updated data from the request body

  try {
    const updatedBooking = await CustomBookingModel.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });
  } catch (error: unknown) {  // Specify 'unknown' type for error
    console.error('Error updating booking:', error);
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error occurred'; // Use type guard
    res.status(500).json({ message: 'Error updating booking', error: errorMessage });
  }
};

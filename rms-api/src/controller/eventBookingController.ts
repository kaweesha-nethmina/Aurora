import { Request, Response } from 'express';
import EventBooking from '../model/eventBookingModel';

// Add Event Booking
export const addEventBooking = async (req: Request, res: Response) => {
  try {
    const { eventId, date, timeSlot, participantCount, totalCharge } = req.body;

    const newBooking = new EventBooking({
      eventId,
      date,
      timeSlot,
      participantCount,
      totalCharge,
    });

    const savedBooking = await newBooking.save();
    return res.status(201).json(savedBooking);
  } catch (error: any) {
    console.error('Failed to add event booking:', error);
    return res.status(500).json({ message: 'Failed to add event booking', error: error.message });
  }
};

// Get All Event Bookings
export const getAllEventBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await EventBooking.find();
    res.status(200).json(bookings);
  } catch (error: any) {
    console.error('Error fetching event bookings:', error);
    res.status(500).json({ message: 'Error fetching event bookings', error: error.message });
  }
};


// Delete Event Booking
export const deleteEventBooking = async (req: Request, res: Response) => {
    const { id } = req.params; // Get ID from the URL
    console.log('Deleting booking with ID:', id); // Log the ID
    
    try {
      const deletedBooking = await EventBooking.findByIdAndDelete(id);
      
      if (!deletedBooking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      res.status(200).json({ message: 'Booking deleted successfully', booking: deletedBooking });
    } catch (error: any) {
      console.error('Error deleting event booking:', error);
      res.status(500).json({ message: 'Error deleting event booking', error: error.message });
    }
  };
  
  // Update Event Booking
export const updateEventBooking = async (req: Request, res: Response) => {
    const { id } = req.params; // Get ID from the URL
    const updatedData = req.body; // Get updated data from the request body
  
    try {
      const updatedBooking = await EventBooking.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedBooking) {
        return res.status(404).json({ message: 'Event booking not found' });
      }
  
      res.status(200).json({ message: 'Event booking updated successfully', booking: updatedBooking });
    } catch (error) {
      console.error('Error updating event booking:', error);
      res.status(500).json({ message: 'Error updating event booking', error });
    }
  };
  
  
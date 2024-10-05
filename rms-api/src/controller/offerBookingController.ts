import { Request, Response } from 'express';
import OfferBooking from '../model/OfferBooking';

// Type assertion for error
const handleError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message; // If error is an instance of Error, return its message
  }
  return 'An unknown error occurred'; // Default message for unknown errors
};

// Create a new offer booking
export const createOfferBooking = async (req: Request, res: Response): Promise<Response> => {
  try {
    const newBooking = new OfferBooking(req.body);
    const savedBooking = await newBooking.save();
    return res.status(201).json(savedBooking); // Return the saved booking
  } catch (error) {
    const errorMessage = handleError(error); // Use the handleError function
    return res.status(500).json({ message: errorMessage });
  }
};

// Get all offer bookings
export const getOfferBookings = async (req: Request, res: Response): Promise<Response> => {
  try {
    const bookings = await OfferBooking.find();
    return res.status(200).json(bookings); // Return all bookings
  } catch (error) {
    const errorMessage = handleError(error); // Use the handleError function
    return res.status(500).json({ message: errorMessage });
  }
};

// Accept a booking
export const acceptOfferBooking = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const booking = await OfferBooking.findByIdAndUpdate(
      id,
      { status: 'confirmed' }, // Update the status to confirmed
      { new: true } // Return the updated document
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    return res.status(200).json(booking); // Return the updated booking
  } catch (error) {
    const errorMessage = handleError(error); // Use the handleError function
    return res.status(500).json({ message: errorMessage });
  }
};

// Reject a booking
export const rejectOfferBooking = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const booking = await OfferBooking.findByIdAndUpdate(
      id,
      { status: 'unsuccessful' }, // Update the status to unsuccessful
      { new: true } // Return the updated document
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    return res.status(200).json(booking); // Return the updated booking
  } catch (error) {
    const errorMessage = handleError(error); // Use the handleError function
    return res.status(500).json({ message: errorMessage });
  }
};

// Delete a booking
export const deleteOfferBooking = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const booking = await OfferBooking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    return res.status(204).send(); // Successfully deleted, no content to return
  } catch (error) {
    const errorMessage = handleError(error); // Use the handleError function
    return res.status(500).json({ message: errorMessage });
  }
};


// Update a booking
export const updateOfferBooking = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const updatedBooking = await OfferBooking.findByIdAndUpdate(
        id,
        { ...req.body }, // Spread the updated fields
        { new: true }    // Return the updated document
      );
  
      if (!updatedBooking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      return res.status(200).json(updatedBooking);
    } catch (error) {
      const errorMessage = handleError(error); // Use the handleError function
      return res.status(500).json({ message: errorMessage });
    }
  };
  
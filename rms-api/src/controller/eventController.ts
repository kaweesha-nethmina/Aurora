import { Request, Response } from 'express';
import Event from '../model/eventModel';
import mongoose from 'mongoose';

// Add Event
export const addEvent = async (req: Request, res: Response) => {
  try {
    const { name, date, time, location, type } = req.body;
    const newEvent = new Event({ name, date, time, location, type });
    const savedEvent = await newEvent.save();
    return res.status(201).json(savedEvent);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to add event', error });
  }
};

// Get All Events
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

// Update Event
export const updateEvent = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    console.log('Updating event with ID:', id); // Log the ID being updated
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid event ID' });
    }
  
    try {
      const { name, date, time, location, type } = req.body;
      const event = await Event.findByIdAndUpdate(id, { name, date, time, location, type }, { new: true });
      
      console.log('Updated event:', event); // Log the updated event
  
      if (!event) return res.status(404).json({ message: 'Event not found' });
      return res.status(200).json(event);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to update event', error });
    }
  };
  

// Delete Event
export const deleteEvent = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    console.log('Deleting event with ID:', id); // Log the ID being deleted
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid event ID' });
    }
  
    try {
      const event = await Event.findByIdAndDelete(id);
      console.log('Deleted event:', event); // Log the deleted event
  
      if (!event) return res.status(404).json({ message: 'Event not found' });
      return res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete event', error });
    }
  };
  
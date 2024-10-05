import { Request, Response } from 'express';
import Event from '../model/eventModel';
import mongoose from 'mongoose';

// Add Event
export const addEvent = async (req: Request, res: Response) => {
  try {
    const { id, name, date, time, location, type, isCustom, details } = req.body;

    const image = req.file ? `http://localhost:5000/${req.file.path}` : undefined;

    const newEvent = new Event({
      id,
      name,
      date,
      time,
      location,
      type,
      isCustom: isCustom === 'true',
      details,
      image,
    });

    const savedEvent = await newEvent.save();
    return res.status(201).json(savedEvent);
  } catch (error: any) {
    console.error('Failed to add event:', error);
    return res.status(500).json({ message: 'Failed to add event', error: error.message });
  }
};

// Get All Events
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error: any) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};

// Update Event
export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { name, date, time, location, type, isCustom, details } = req.body;
    const updatedEvent = await Event.findOneAndUpdate(
      { id },
      { name, date, time, location, type, isCustom, details },
      { new: true }
    );

    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
    return res.status(200).json(updatedEvent);
  } catch (error: any) {
    console.error('Failed to update event:', error);
    return res.status(500).json({ message: 'Failed to update event', error: error.message });
  }
};

// Delete Event
export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findOneAndDelete({ id });
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
    return res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error: any) {
    console.error('Failed to delete event:', error);
    return res.status(500).json({ message: 'Failed to delete event', error: error.message });
  }
};

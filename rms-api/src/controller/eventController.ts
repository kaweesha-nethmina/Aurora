import { Request, Response } from 'express';
import Event from '../model/eventModel';
import mongoose from 'mongoose';

// Add Event
export const addEvent = async (req: Request, res: Response) => {
  try {
    const { id, name, date, time, location, type } = req.body;
    const newEvent = new Event({ id, name, date, time, location, type });
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

  try {
    const { name, date, time, location, type } = req.body;
    const event = await Event.findOneAndUpdate({ id }, { name, date, time, location, type }, { new: true });

    if (!event) return res.status(404).json({ message: 'Event not found' });
    return res.status(200).json(event);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update event', error });
  }
};

// Delete Event
export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const event = await Event.findOneAndDelete({ id });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    return res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete event', error });
  }
};

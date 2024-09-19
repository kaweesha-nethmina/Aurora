// rms-api/controllers/roomController.ts
import { Request, Response } from 'express';
import { Room } from '../model/roomModel';

// Add Room
export const addRoom = async (req: Request, res: Response) => {
  try {
    const { roomType, price, rating, description } = req.body;
    const image = req.file ? req.file.path : undefined; // Handle the image path if provided
    
    const room = new Room({ roomType, price, rating, description, image });
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Get Rooms
export const getRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Update Room
export const updateRoom = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedRoom = await Room.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Delete Room
export const deleteRoom = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedRoom = await Room.findByIdAndDelete(id);
    if (!deletedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

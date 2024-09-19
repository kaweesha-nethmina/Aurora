import { Request, Response } from 'express';
import Notice from '../model/noticeModel';

// Create a new notice
export const createNotice = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const newNotice = new Notice({ title, description });
    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create notice', error });
  }
};

// Get all notices
export const getNotices = async (req: Request, res: Response) => {
  try {
    const notices = await Notice.find();
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notices', error });
  }
};

// Update a notice
export const updateNotice = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedNotice = await Notice.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedNotice) {
        return res.status(404).json({ message: 'Notice not found' });
      }
      res.json(updatedNotice);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

// Delete a notice
export const deleteNotice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedNotice = await Notice.findByIdAndDelete(id);
    if (!deletedNotice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    res.json({ message: 'Notice deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete notice', error });
  }
};

// src/controller/feedbackController.ts
import { Request, Response } from 'express';
import Feedback from '../model/feedbackModel';

// Add new feedback
export const addFeedback = async (req: Request, res: Response) => {
  try {
    const { name, rating, description } = req.body;
    const feedback = new Feedback({ name, rating, description });
    await feedback.save();
    res.status(201).json({ message: 'Feedback added successfully', feedback });
  } catch (error) {
    console.error('Error adding feedback:', error);
    res.status(500).json({ message: 'Failed to add feedback', error });
  }
};

// Get all feedback
export const getFeedbacks = async (req: Request, res: Response) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Failed to fetch feedback', error });
  }
};

// Update feedback by ID
export const updateFeedback = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, rating, description } = req.body;

  try {
    const existingFeedback = await Feedback.findById(id);
    if (!existingFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { name, rating, description },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: 'Feedback updated successfully', feedback: updatedFeedback });
  } catch (error) {
    console.error('Error updating feedback:', error);
    res.status(500).json({ message: 'Failed to update feedback', error });
  }
};

// Delete feedback by ID
export const deleteFeedback = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(id);
    if (!deletedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({ message: 'Failed to delete feedback', error });
  }
};

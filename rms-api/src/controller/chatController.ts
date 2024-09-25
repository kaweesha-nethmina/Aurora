import { Request, Response } from 'express';
import ChatMessage from '../model/chatModel';

export const getChats = async (req: Request, res: Response) => {
  try {
    const chats = await ChatMessage.find().populate('employeeId', 'firstName');
    res.json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ message: 'Failed to fetch chats' });
  }
};

export const createChat = async (req: Request, res: Response) => {
  try {
    const chatMessage = new ChatMessage(req.body);
    const savedMessage = await chatMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error creating chat:', error);
    res.status(500).json({ message: 'Failed to create chat' });
  }
};

export const deleteChat = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await ChatMessage.findByIdAndDelete(id);
    res.status(200).json({ message: 'Chat deleted successfully' });
  } catch (error) {
    console.error('Error deleting chat:', error);
    res.status(500).json({ message: 'Failed to delete chat' });
  }
};

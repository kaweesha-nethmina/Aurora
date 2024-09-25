import mongoose, { Schema, Document } from 'mongoose';
import { Request, Response } from 'express'; // Import Request and Response

interface IChatMessage extends Document {
  chatId: string;
  message: string;
  employeeId: mongoose.Schema.Types.ObjectId;
  timestamp: Date;
}

const chatMessageSchema = new Schema<IChatMessage>({
  chatId: { type: String, required: true },
  message: { type: String, required: true },
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  timestamp: { type: Date, default: Date.now }
});

// Define the ChatMessage model
const ChatMessage = mongoose.model<IChatMessage>('ChatMessage', chatMessageSchema, 'chatMessages');

// Function to retrieve chats
export const getChats = async (req: Request, res: Response) => {
  try {
    const chats = await ChatMessage.find()
      .populate('employeeId', 'firstName') // Populate only the firstName field
      .exec();
    res.status(200).json(chats);
  } catch (error) {
    console.error('Error retrieving chats:', error);
    res.status(500).json({ message: 'Error retrieving chats', error });
  }
};

// Export the ChatMessage model
export default ChatMessage;

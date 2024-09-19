// src/model/chatModel.ts

import mongoose, { Schema, Document } from 'mongoose';

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

const ChatMessage = mongoose.model<IChatMessage>('ChatMessage', chatMessageSchema, 'chatMessages');

export default ChatMessage;

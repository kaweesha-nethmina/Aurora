// rms-api/models/roomModel.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IRoom extends Document {
  roomType: string;
  price: number;
  rating: number;
  description: string;
  image?: string; // Optional field
}

const roomSchema: Schema = new Schema({
  roomType: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  description: { type: String, required: true },
  image: { type: String, required: false }, // Optional field
});

export const Room = mongoose.model<IRoom>('Room', roomSchema);

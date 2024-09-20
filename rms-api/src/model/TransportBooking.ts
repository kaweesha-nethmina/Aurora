import mongoose, { Document, Schema } from 'mongoose';

export interface ITransportBooking extends Document {
  name: string;
  email: string;
  phone: string;
  pickup: string;
  dropoff: string;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'canceled';
}

const TransportBookingSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  pickup: { type: String, required: true },
  dropoff: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'canceled'], default: 'pending' },
});

export default mongoose.model<ITransportBooking>('TransportBooking', TransportBookingSchema, 'TransportBooking');

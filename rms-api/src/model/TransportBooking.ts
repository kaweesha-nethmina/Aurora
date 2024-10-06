import mongoose, { Document, Schema } from 'mongoose';

export interface ITransportBooking extends Document {
  name: string;
  email: string;
  phone: string;
  pickup: string;
  dropoff: string;
  date: Date;
  time: string;
  vehicle: 'Car' | 'Van' | 'Tuk Tuk';
  status: 'pending' | 'confirmed' | 'canceled' | 'approved' | 'rejected'; // Updated status options
  price?: number; // Optional price field
  paymentStatus: 'pending' | 'success' | 'unsuccessful'; // New payment status field
}

const TransportBookingSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  pickup: { type: String, required: true },
  dropoff: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  vehicle: { type: String, enum: ['Car', 'Van', 'Tuk Tuk'], required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'canceled', 'approved', 'rejected'], default: 'pending' },
  price: { type: Number }, // Optional price field
  paymentStatus: { type: String, enum: ['pending', 'success', 'unsuccessful'], default: 'pending' } // New payment status field
});

export default mongoose.model<ITransportBooking>('TransportBooking', TransportBookingSchema, 'TransportBooking');

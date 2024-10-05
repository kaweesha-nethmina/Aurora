import mongoose, { Schema, Document } from 'mongoose';

export interface IOfferBooking extends Document {
  fullName: string;
  phoneNumber: string;
  offerName: string;
  offerPrice: string;
  date: string;
  description: string;
  status: string; // Updated field name to match the functionality
}

const OfferBookingSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  offerName: { type: String, required: true },
  offerPrice: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, default: 'pending' }, // Default status is 'pending'
  description: { type: String, required: true },
});

// Update to use custom collection name 'offerBookings'
export default mongoose.model<IOfferBooking>('OfferBooking', OfferBookingSchema, 'offerBookings');

import mongoose, { Schema, Document } from 'mongoose';

interface CustomBooking extends Document {
  fullName: string;
  phoneNumber: string;
  guestCount: number;
  perPersonCharge: number;
  additionalResources: string[];
  totalAmount: number;
  bookingDate: Date;
  status: string;
}

const customBookingSchema = new Schema<CustomBooking>({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  guestCount: { type: Number, required: true },
  perPersonCharge: { type: Number, required: true },
  additionalResources: { type: [String], required: true },
  totalAmount: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' }
});

export default mongoose.model<CustomBooking>('CustomBooking', customBookingSchema, 'customBookings');


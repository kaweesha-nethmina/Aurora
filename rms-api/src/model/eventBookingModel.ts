import mongoose, { Schema, Document } from 'mongoose';

interface IEventBooking extends Document {
  eventId: string; // The ID of the related event
  date: Date;
  timeSlot: string;
  participantCount: number;
  totalCharge: number; // Charge for the total participants
  userId?: string; // Optional: ID of the user making the booking
  userName?: string; // Optional: Name of the user making the booking
  contactInfo?: string; // Optional: Contact information of the user
  paymentStatus?: string; // Optional: Payment status (e.g., 'Paid', 'Pending')
  status: string;
}

const eventBookingSchema: Schema = new Schema({
  eventId: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  participantCount: { type: Number, required: true },
  totalCharge: { type: Number, required: true },
  userId: { type: String, required: false },
  userName: { type: String, required: false },
  contactInfo: { type: String, required: false },
  status: { type: String, default: 'pending' } ,
  paymentStatus: { type: String, enum: ['Paid', 'Pending', 'Cancelled'], default: 'Pending' }
});

export default mongoose.model<IEventBooking>('EventBooking', eventBookingSchema);

import mongoose, { Document, Schema } from 'mongoose';

export interface IRoomBooking extends Document {
  roomType: string;
  arrivalDate: Date;
  departureDate: Date;
  specialRequests: string;
  paymentMethod: string;
  cardNumber?: string;
  expirationDate?: string;
  cvv?: string;
  status: string; // Add status to the interface
  email: string; // Add email to the interface
}

const RoomBookingSchema: Schema = new Schema({
  roomType: { type: String, required: true },
  arrivalDate: { type: Date, required: true },
  departureDate: { type: Date, required: true },
  specialRequests: { type: String },
  paymentMethod: { type: String, required: true },
  cardNumber: { type: String },
  expirationDate: { type: String },
  cvv: { type: String },
  status: { type: String, default: 'Pending' }, // Add status field with default value
  email: { type: String, required: true }, // Add email field to schema
});

// Export the model with the updated schema
export default mongoose.model<IRoomBooking>('RoomBooking', RoomBookingSchema, 'roombookings');

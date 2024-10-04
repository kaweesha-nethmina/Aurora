import mongoose, { Schema, Document } from 'mongoose';

export interface ITableReservation extends Document {
  arrivalDate: Date;
  departureDate: Date;
  numGuests: number;
  name: string;
  checkin: string;
  checkout: string;
  foodcode: string;
  phone: string;
  email: string;
  status: string; // Add the status field to the interface
}

const TableReservationSchema: Schema = new Schema({
  arrivalDate: { type: Date, required: true },
  departureDate: { type: Date, required: true },
  numGuests: { type: Number, required: true },
  name: { type: String, required: true },
  checkin: { type: String, required: true },
  checkout: { type: String, required: true },
  foodcode: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, default: 'pending' } // Add the status field with a default value
}, {
  timestamps: true
});

export default mongoose.model<ITableReservation>('TableReservation', TableReservationSchema);
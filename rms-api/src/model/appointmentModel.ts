import mongoose, { Document, Schema } from 'mongoose';

interface IAppointment extends Document {
  doctor: string;
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  status: 'Pending' | 'Approved' | 'Rejected'; // Add status field
}

const appointmentSchema: Schema = new Schema({
  doctor: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, default: 'Pending' }, // Default status
});

const Appointment = mongoose.model<IAppointment>('Appointment', appointmentSchema, 'medicalAppointments');

export default Appointment;

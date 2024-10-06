import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for SpaAppointment
export interface ISpaAppointment extends Document {
    name: string;
    email: string;
    service: string;
    date: string;
    time: string;
    message?: string; // Make message optional
    status: 'pending' | 'accepted' | 'rejected'; // Added status field
}

// Create the schema for SpaAppointment
const SpaAppointmentSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    service: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    message: { type: String, required: false },
    status: { type: String, required: true, default: 'pending' }, // Set default status to 'pending'
});

// Export the model
export default mongoose.model<ISpaAppointment>('SpaAppointment', SpaAppointmentSchema);

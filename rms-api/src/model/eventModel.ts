import mongoose, { Document, Schema } from 'mongoose';

// Update the interface to include new fields
export interface IEvent extends Document {
  id: string; // Change from _id to id
  name: string;
  date: string;
  time: string;
  location: string;
  type: string;
  isCustom: boolean; // New field
  details?: string;  // New optional field
  image?: string;    // Image field (consider changing to string for storing paths or URLs)
}

const EventSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true }, // Ensure unique ID
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  isCustom: { type: Boolean, required: true }, // New field
  details: { type: String }, // New optional field
  image: { type: String } // Change this if you plan to store images differently
});

// Model creation
const Event = mongoose.model<IEvent>('Event', EventSchema, 'events');
export default Event;

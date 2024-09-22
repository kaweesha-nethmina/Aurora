import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  name: string;
  date: string;
  time: string;
  location: string;
  type: string;
}

const EventSchema: Schema = new Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
});

const Event = mongoose.model<IEvent>('Event', EventSchema, 'events');
export default Event;

import mongoose, { Schema, Document } from 'mongoose';

interface INotice extends Document {
  title: string;
  description: string;
}

const NoticeSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model<INotice>('Notice', NoticeSchema);

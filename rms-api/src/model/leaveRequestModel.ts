
import mongoose, { Document, Schema } from 'mongoose';

export interface ILeaveRequest extends Document {
  employee: string;
  startDate: Date;
  endDate: Date;
  catagory: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

const LeaveRequestSchema: Schema = new Schema({
  employee: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  catagory: { type: String, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

const LeaveRequestModel = mongoose.model<ILeaveRequest>('LeaveRequest', LeaveRequestSchema);

export default LeaveRequestModel;
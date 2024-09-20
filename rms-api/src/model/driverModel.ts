// src/models/driverModel.ts
import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  driverCode: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Phone number must be 10 digits'],
  },
}, { timestamps: true });

const Driver = mongoose.model('Driver', driverSchema);

export default Driver;

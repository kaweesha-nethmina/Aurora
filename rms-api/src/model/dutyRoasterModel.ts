import mongoose from 'mongoose';

// Define the schema for duty roaster entries
const dutyRoasterSchema = new mongoose.Schema({
  date: {
    type: Date, // Use Date type for better date handling
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
    trim: true, // Trims any whitespace
  },
  shift: {
    type: String,
    enum: ['Morning', 'Evening', 'Night'],
    required: true,
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create the model based on the schema
const DutyRoaster = mongoose.model('DutyRoaster', dutyRoasterSchema, 'dutyRoasters');

export default DutyRoaster;

import { Schema, model } from 'mongoose';

// Define the Employee schema
const employeeSchema = new Schema({
  employeeID: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  hire_date: {
    type: Date,
    required: true,
  },
  contact_info: {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
});

// Create the Employee model
const Employee = model('Employee', employeeSchema);

export default Employee;

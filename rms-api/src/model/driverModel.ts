import mongoose from 'mongoose';

// Define a schema for driver license information
const driverLicenseInfoSchema = new mongoose.Schema({
  licenseType: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
});

// Define the main driver schema
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
  NIC: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Phone number must be 10 digits'],
  },
  address: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  joinDate: {
    type: Date,
    required: true,
  },
  driverLicenseInfo: {
    type: driverLicenseInfoSchema,
    required: true,
  },
}, { timestamps: true });

const Driver = mongoose.model('Driver', driverSchema);

export default Driver;

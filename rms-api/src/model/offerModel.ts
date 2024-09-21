import mongoose from 'mongoose';

// Define the schema for offers
const offerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Ensure price is a positive number
  },
  description: {
    type: String,
    required: true, // Description is required
  },
  image: {
    type: String, // Store image URL
    required: false, // Optional if not all items require an image
  },
}, { timestamps: true }); // Automatically create createdAt and updatedAt fields

// Create the Offer model from the schema
const Offer = mongoose.model('Offer', offerSchema, 'offers');

export default Offer;

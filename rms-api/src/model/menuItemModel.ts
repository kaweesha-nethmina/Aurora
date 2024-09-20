import mongoose from 'mongoose';

// Define the schema for menu items
const menuItemSchema = new mongoose.Schema({
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
    required: false, // Description is optional
  },
  category: {
    type: String,
    enum: ['food', 'drink'], // Define valid categories
    required: true,
  },
  image: {
    type: String, // Store image URL
    required: false, // Optional if not all items require an image
  },
  availability: {
    type: Boolean,
    default: true, // Default to true
  },
  foodCode: {
    type: String,
    required: true,
    unique: true, // Ensure foodCode is unique for each item
  },
}, { timestamps: true }); // Automatically create createdAt and updatedAt fields

// Create the MenuItem model from the schema
const MenuItem = mongoose.model('MenuItem', menuItemSchema, 'menu-items');

export default MenuItem;

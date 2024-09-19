import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true, // Assuming category is mandatory
  },
  image: {
    type: String, // Changed from imageUrl to image for consistency
    required: true, // Uncomment if you want to make the image required
  },
  availability: {
    type: Boolean,
    default: true,
  },
  foodCode: {
    type: String,
    required: true,
    unique: true, // Ensure foodCode is unique
  },
});

// Ensure the model name corresponds to the collection name in MongoDB
const MenuItem = mongoose.model('MenuItem', menuItemSchema, 'menu-items');

export default MenuItem;

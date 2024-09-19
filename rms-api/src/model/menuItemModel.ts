import mongoose, { Document, Schema } from 'mongoose';

export interface IMenuItem extends Document {
  name: string;
  price: number;
  description: string;
  foodCode: string;
  category: string;
  image: string;
}

const MenuItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  foodCode: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String }
});

export default mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);

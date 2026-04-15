// /lib/models/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  slug: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  description: { type: String },
  color: { type: String },
  longDescription: { type: String },
  features: [{ type: String }],
  platforms: [{ type: String }],
  image: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);

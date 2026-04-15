// /lib/models/Service.js
import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  slug: { type: String, unique: true, required: true },
  iconName: { type: String },
  image: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  longDescription: { type: String },
  details: [{ type: String }],
  features: [{ type: String }],
  technologies: [{ type: String }],
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);

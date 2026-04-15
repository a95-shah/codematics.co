// /lib/models/RemoteResource.js
import mongoose from 'mongoose';

const RemoteResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  skills: [{ type: String }],
  experience: { type: String },
  image: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.RemoteResource || mongoose.model('RemoteResource', RemoteResourceSchema);

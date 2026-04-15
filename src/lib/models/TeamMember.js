// /lib/models/TeamMember.js
import mongoose from 'mongoose';

const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String },
  bio: { type: String },
  image: { type: String },
  linkedin: { type: String },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);

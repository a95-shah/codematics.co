// /lib/models/NewsPost.js
import mongoose from 'mongoose';

const NewsPostSchema = new mongoose.Schema({
  slug: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String },
  category: { type: String },
  content: { type: String },
  coverImage: { type: String },
  author: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.NewsPost || mongoose.model('NewsPost', NewsPostSchema);

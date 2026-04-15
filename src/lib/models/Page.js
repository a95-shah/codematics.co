// /lib/models/Page.js
import mongoose from 'mongoose';

const PageSchema = new mongoose.Schema({
  slug: { type: String, unique: true, required: true },
  title: { type: String },
  heroTitle: { type: String },
  heroSubtitle: { type: String },
  sections: [{
    heading: { type: String },
    body: { type: String }
  }],
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Page || mongoose.model('Page', PageSchema);

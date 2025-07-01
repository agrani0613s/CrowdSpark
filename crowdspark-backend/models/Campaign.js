import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  goal: { type: Number, required: true },
  deadline: { type: Date, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String }, // Optional
}, { timestamps: true });

const Campaign = mongoose.model('Campaign', campaignSchema);
export default Campaign;
import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  title: String,
  description: String,
  goal: Number,
  deadline: Date,
  category: String,
  imageUrl: String,
}, { timestamps: true });

export default mongoose.model("Campaign", campaignSchema);

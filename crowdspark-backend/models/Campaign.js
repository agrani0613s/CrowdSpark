import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  title: String,
  description: String,
  goal: Number,
  deadline: Date,
  category: String,
  image: String,
  createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
}

}, { timestamps: true });

export default mongoose.model("Campaign", campaignSchema);

import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
// <<<<<<< HEAD
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   goal: { type: Number, required: true },
//   deadline: { type: Date, required: true },
//   category: { type: String, required: true },
//   imageUrl: { type: String }, // Optional
// =======
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

// >>>>>>> origin/auth-profile-work
}, { timestamps: true });

const Campaign = mongoose.model('Campaign', campaignSchema);
export default Campaign;
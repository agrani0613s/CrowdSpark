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
  raised: { type: Number, default: 0 },
  goal: Number,
  deadline: Date,
  category: {
  type: String,
  required: true,
},
  image: String,
  createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
},
views: {
  type: Number,
  default: 0,
}

// >>>>>>> origin/auth-profile-work
}, { timestamps: true });

const Campaign = mongoose.model('Campaign', campaignSchema);
export default Campaign;
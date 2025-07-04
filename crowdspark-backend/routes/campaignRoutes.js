import express from "express";
import { createCampaign, getAllCampaigns } from "../controllers/campaignController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import Campaign from "../models/Campaign.js";

const router = express.Router();

// ✅ Create campaign (with file upload and auth middleware)
router.post("/", protect, upload.single("image"), createCampaign);

// ✅ Get all campaigns
router.get("/", getAllCampaigns);

// ✅ Get campaigns by user
router.get("/user/:userId", async (req, res) => {
  try {
    const userCampaigns = await Campaign.find({ createdBy: req.params.userId }).sort({ createdAt: -1 });
    res.json(userCampaigns);
  } catch (err) {
    res.status(500).json({ message: "Error fetching campaigns" });
  }
});

export default router;

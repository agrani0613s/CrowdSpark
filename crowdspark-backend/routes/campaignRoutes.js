import express from "express";
import {
  createCampaign,
  getMyCampaigns,
  getCampaigns,
  getCampaignById,
  incrementViewCount,
} from "../controllers/campaignController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// ✅ Create campaign (with image upload)
router.post("/", protect, upload.single("image"), createCampaign);

// ✅ Get all campaigns with optional query filters (?createdBy=userId)
router.get("/", getCampaigns);

// ✅ Get campaigns created by the logged-in user
router.get("/my", protect, getMyCampaigns);

// ✅ Get campaigns by category
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;

    const campaigns = await Campaign.find({
      category: { $regex: new RegExp(category, "i") },
    });

    res.status(200).json(campaigns);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching category campaigns" });
  }
});

// ✅ Get campaign by ID and increment views
router.get("/:id", getCampaignById);

// ✅ Increment view count manually (if needed)
router.post("/:id/increment-view", incrementViewCount);

export default router;

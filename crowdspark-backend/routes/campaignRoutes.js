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


router.post('/', async (req, res) => {
  try {
    const { title, description, goal, deadline, category, imageUrl } = req.body;

    const newCampaign = new Campaign({
      title,
      description,
      goal,
      deadline,
      category,
      imageUrl,
    });

    await newCampaign.save();
    console.log('✅ Campaign saved to DB:', newCampaign);
    res.status(201).json({ message: 'Campaign created successfully' });
  } catch (error) {
    console.error('❌ Error saving campaign:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


export default router;

import express from "express";
import Donation from "../models/Donation.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a donation
router.post("/", protect, async (req, res) => {
  try {
    const { campaignId, amount } = req.body;

    const donation = new Donation({
      user: req.user._id,
      campaign: campaignId,
      amount,
    });

    await donation.save();
    res.status(201).json(donation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating donation" });
  }
});

// Get donations by user
router.get("/my", protect, async (req, res) => {
  try {
    const donations = await Donation.find({ user: req.user._id })
      .populate("campaign", "title image")
      .sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching donations" });
  }
});

export default router;

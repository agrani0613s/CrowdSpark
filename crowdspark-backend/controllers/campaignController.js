import asyncHandler from "express-async-handler";
import Campaign from "../models/Campaign.js";

// ✅ Create Campaign
export const createCampaign = asyncHandler(async (req, res) => {
  const { title, description, goal, deadline, category } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

  const campaign = new Campaign({
    title,
    description,
    goal,
    deadline,
    category,
    image: imagePath,
    createdBy: req.user._id,
  });

  const saved = await campaign.save();
  res.status(201).json(saved);
});

// ✅ Get Campaigns Created by Logged-in User
export const getMyCampaigns = asyncHandler(async (req, res) => {
  const campaigns = await Campaign.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
  res.json(campaigns);
});

// ✅ Get All Campaigns (optionally filter by category or createdBy)
// controllers/campaignController.js
// ✅ Get All Campaigns (optionally filter by category or createdBy or sort by views)
export const getCampaigns = asyncHandler(async (req, res) => {
  const query = {};

  if (req.query.category) {
    query.category = { $regex: `^${req.query.category.trim()}$`, $options: "i" };
  }

  if (req.query.createdBy) {
    query.createdBy = req.query.createdBy;
  }

  let sort = { createdAt: -1 }; // default

  if (req.query.sortBy === "views") {
    sort = { views: -1 };
  } else if (req.query.sortBy === "raised") {
    sort = { raised: -1 };
  }

  const campaigns = await Campaign.find(query).sort(sort);
  res.json(campaigns);
});


// ✅ Get Campaign by ID (no view increment here!)
export const getCampaignById = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);
  if (!campaign) {
    res.status(404);
    throw new Error("Campaign not found");
  }

  res.json(campaign);
});

// ✅ Increment View Count (called explicitly from frontend)
export const incrementViewCount = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);
  if (!campaign) {
    return res.status(404).json({ message: "Campaign not found" });
  }

  campaign.views = (campaign.views || 0) + 1;
  await campaign.save();

  res.status(200).json({ success: true, views: campaign.views });
});

import Campaign from "../models/Campaign.js";

export const createCampaign = async (req, res) => {
  try {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


// GET /api/campaigns?createdBy=userId
export const getMyCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ createdBy: req.user._id });
    res.json(campaigns);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


// ✅ Get All Campaigns (optionally filter by category)
export const getCampaigns = async (req, res) => {
  try {
    const query = {};

    // 🔥 Add category filter if query param exists
    if (req.query.category) {
      // query.category = { $regex: new RegExp(`^${req.query.category}$`, "i") };
      query.category = { $regex: `^${req.query.trim()}$`, $options: "i" };
    }

    const campaigns = await Campaign.find(query).sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (err) {
    console.error("❌ Error fetching campaigns:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getCampaignsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const campaigns = await Campaign.find({ category: category });
    res.status(200).json({ data: campaigns });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};



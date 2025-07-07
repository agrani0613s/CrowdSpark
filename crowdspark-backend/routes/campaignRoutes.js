// import express from "express";
// import { createCampaign, getAllCampaigns } from "../controllers/campaignController.js";
// import { protect } from "../middleware/authMiddleware.js";
// import upload from "../middleware/upload.js";
// import Campaign from "../models/Campaign.js";

// const router = express.Router();

// // ✅ Create campaign (with file upload and auth middleware)
// router.post("/", protect, upload.single("image"), createCampaign);

// // ✅ Get all campaigns
// router.get("/", getAllCampaigns);

// // ✅ Get campaigns by user
// router.get("/user/:userId", async (req, res) => {
//   try {
//     const userCampaigns = await Campaign.find({ createdBy: req.params.userId }).sort({ createdAt: -1 });
//     res.json(userCampaigns);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching campaigns" });
//   }
// });


// router.post('/', async (req, res) => {
//   try {
//     const { title, description, goal, deadline, category, imageUrl } = req.body;

//     const newCampaign = new Campaign({
//       title,
//       description,
//       goal,
//       deadline,
//       category,
//       imageUrl,
//     });

//     await newCampaign.save();
//     console.log('✅ Campaign saved to DB:', newCampaign);
//     res.status(201).json({ message: 'Campaign created successfully' });
//   } catch (error) {
//     console.error('❌ Error saving campaign:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });


// export default router;


import express from "express";
import { createCampaign, getMyCampaigns, getCampaignsByCategory } from "../controllers/campaignController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import Campaign from "../models/Campaign.js";

const router = express.Router();

// ✅ Create campaign (with file upload and auth middleware)
router.post("/", protect, upload.single("image"), createCampaign);

// ✅ Get all campaigns (with optional ?category filter)
// router.get("/", async (req, res) => {
//   try {
//     const { category } = req.query;
//     let campaigns;

//     if (category) {
//       // Case-insensitive match for category
//       campaigns = await Campaign.find({
//         category: { $regex: category, $options: "i" }
// ,
//       }).sort({ createdAt: -1 });
//     } else {
//       // No filter → return all campaigns
//       campaigns = await Campaign.find({}).sort({ createdAt: -1 });
//     }

//     res.json(campaigns);
//   } catch (err) {
//     console.error("❌ Error fetching campaigns:", err);
//     res.status(500).json({ message: "Error fetching campaigns" });
//   }
// });

// // ✅ Get campaigns by user
// router.get("/user/:userId", async (req, res) => {
//   try {
//     const userCampaigns = await Campaign.find({ createdBy: req.params.userId }).sort({ createdAt: -1 });
//     res.json(userCampaigns);
//   } catch (err) {
//     console.error("❌ Error fetching user campaigns:", err);
//     res.status(500).json({ message: "Error fetching user campaigns" });
//   }
// });

// GET /api/campaigns/my - Get campaigns created by logged-in user
router.get("/my", protect, async (req, res) => {
  try {
    const campaigns = await Campaign.find({ createdBy: req.user._id });
    res.status(200).json(campaigns);
  } catch (err) {
    console.error("Error fetching user campaigns", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET /api/campaigns
router.get("/", async (req, res) => {
  try {
    const { createdBy } = req.query;

    let query = {};
    if (createdBy) {
      query.createdBy = createdBy;
    }

    const campaigns = await Campaign.find(query);
    res.status(200).json(campaigns);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// router.get("/category/:categoryName", getCampaignsByCategory);

// ✅ Get all campaigns in a category
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;

    // Find campaigns with matching category (case-insensitive)
    const campaigns = await Campaign.find({
      category: { $regex: new RegExp(category, "i") },
    });

    res.status(200).json(campaigns);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching campaigns" });
  }
});

// Get single campaign by ID
router.get("/:id", async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/campaigns - Get all campaigns
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching campaigns' });
  }
});




export default router;

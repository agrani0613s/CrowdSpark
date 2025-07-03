// routes/campaignRoutes.js
import express from 'express';
import Campaign from '../models/Campaign.js';

const router = express.Router();

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

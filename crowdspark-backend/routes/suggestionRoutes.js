import express from 'express';
import Campaign from '../models/Campaign.js'; // Make sure path is correct

const router = express.Router();

// POST /api/suggested-campaigns
router.post('/suggested-campaigns', async (req, res) => {
  const { preferences } = req.body;  // preferences = ['tech', 'art', ...]

  if (!preferences || preferences.length === 0) {
    return res.status(400).json({ error: 'No preferences provided.' });
  }

  try {
    const campaigns = await Campaign.aggregate([
      { $match: { category: { $in: preferences } } },
      { $sample: { size: 6 } }  // Random 6
    ]);

    res.json(campaigns);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ error: 'Failed to fetch suggested campaigns.' });
  }
});

export default router;

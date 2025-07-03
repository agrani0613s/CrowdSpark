import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config();
const router = express.Router();

router.post('/generate-description', async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Campaign title is required.' });
  }

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        contents: [
          {
            parts: [
              {
                text: `Write a 3 line crowdfunding campaign description for this project titled: "${title}".`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': process.env.GEMINI_API_KEY, // Put your API key in .env
        },
      }
    );

    const description = response.data.candidates[0]?.content?.parts[0]?.text || 'No response received.';
    res.json({ description });
  } catch (error) {
    console.error('Gemini API error:', error?.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to generate description',
      details: error?.response?.data || error.message,
    });
  }
});

export default router;

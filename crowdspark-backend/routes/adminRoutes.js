import express from 'express';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

router.get('/dashboard', isAdmin, (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.name}` });
});

export default router;

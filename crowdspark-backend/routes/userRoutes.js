import express from 'express';
import { getUserProfile, uploadProfilePic } from '../controllers/userController.js';
import upload from '../middleware/multer.js'; // Multer for file upload

const router = express.Router();

router.get('/:id/profile', getUserProfile);
router.post('/:id/profile-pic', upload.single('profilePic'), uploadProfilePic);

export default router;

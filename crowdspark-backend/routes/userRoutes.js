import express from 'express';
import { getUserProfile, uploadProfilePic, updateProfile } from '../controllers/userController.js';
import upload from '../middleware/multer.js'; // Multer for file upload
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get('/:id/profile', getUserProfile);
router.post('/:id/profile-pic', upload.single('profilePic'), uploadProfilePic);
router.put("/:id/update", protect, updateProfile);

export default router;

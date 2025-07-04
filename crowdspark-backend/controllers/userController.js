import User from '../models/User.js';
import Campaign from '../models/Campaign.js';
import Donation from '../models/Donation.js';

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
      .populate('donations')
      .populate('fundraisers');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const uploadProfilePic = async (req, res) => {
  try {
    const userId = req.params.id;
    const profilePicUrl = `/uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(userId, { profilePic: profilePicUrl }, { new: true });
    res.json({ message: 'Profile picture updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Error uploading picture' });
  }
};

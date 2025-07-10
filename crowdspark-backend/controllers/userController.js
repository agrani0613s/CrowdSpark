import User from '../models/User.js';
import Campaign from '../models/Campaign.js';
import asyncHandler from 'express-async-handler';
import path from 'path';
import fs from 'fs';

// =======================
// 📌 Saved Campaigns Logic
// =======================

// @desc    Save a campaign
// @route   POST /api/users/save-campaign/:campaignId
// @access  Private
export const saveCampaign = asyncHandler(async (req, res) => {
  const { campaignId } = req.params;

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (!user.savedCampaigns.includes(campaignId)) {
    user.savedCampaigns.push(campaignId);
    await user.save();
  }

  res.status(200).json({ message: 'Campaign saved successfully' });
});

// @desc    Unsave a campaign
// @route   DELETE /api/users/save-campaign/:campaignId
// @access  Private
export const unsaveCampaign = asyncHandler(async (req, res) => {
  const { campaignId } = req.params;

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.savedCampaigns = user.savedCampaigns.filter(
    (id) => id.toString() !== campaignId
  );

  await user.save();

  res.status(200).json({ message: 'Campaign removed from saved list' });
});

// @desc    Get all saved campaigns for user
// @route   GET /api/users/saved-campaigns
// @access  Private
export const getSavedCampaigns = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('savedCampaigns');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json(user.savedCampaigns);
});


// =======================
// 📌 Profile Section (already working in your app)
// =======================

// @desc    Get user profile
// @route   GET /api/users/:id/profile
// @access  Public
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Upload user profile picture
// @route   POST /api/users/:id/profile-pic
// @access  Private
export const uploadProfilePic = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Remove previous profile picture if exists
  if (user.profilePic && fs.existsSync(user.profilePic)) {
    fs.unlinkSync(user.profilePic);
  }

  user.profilePic = req.file.path;
  await user.save();

  res.status(200).json({ message: 'Profile picture updated', profilePic: user.profilePic });
});

// @desc    Update user profile
// @route   PUT /api/users/:id/update
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.occupation = req.body.occupation || user.occupation;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      occupation: updatedUser.occupation,
      profilePic: updatedUser.profilePic,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

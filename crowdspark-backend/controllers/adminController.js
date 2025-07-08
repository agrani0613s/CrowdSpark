import User from '../models/User.js';
import Campaign from '../models/Campaign.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// @desc    Get all campaigns
// @route   GET /api/admin/campaigns
// @access  Private/Admin
export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate('creator', 'username email');
    res.status(200).json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ message: 'Failed to fetch campaigns' });
  }
};

// @desc    Approve/Reject/Delete user
// @route   PATCH /api/admin/users/:id
// @access  Private/Admin
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (action === 'approve') {
      user.isApproved = true;
    } else if (action === 'reject') {
      user.isApproved = false;
    } else if (action === 'delete') {
      await user.remove();
      return res.status(200).json({ message: 'User deleted successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }

    await user.save();
    res.status(200).json({ message: `User ${action}d successfully`, user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
};

// @desc    Approve/Reject/Delete campaign
// @route   PATCH /api/admin/campaigns/:id
// @access  Private/Admin
export const updateCampaign = async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;

  try {
    const campaign = await Campaign.findById(id);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

    if (action === 'approve') {
      campaign.status = 'approved';
    } else if (action === 'reject') {
      campaign.status = 'rejected';
    } else if (action === 'delete') {
      await campaign.remove();
      return res.status(200).json({ message: 'Campaign deleted successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }

    await campaign.save();
    res.status(200).json({ message: `Campaign ${action}d successfully`, campaign });
  } catch (error) {
    console.error('Error updating campaign:', error);
    res.status(500).json({ message: 'Failed to update campaign' });
  }
};


export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCampaigns = await Campaign.countDocuments();
    const totalDonations = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.status(200).json({
      users: totalUsers,
      campaigns: totalCampaigns,
      donations: totalDonations[0]?.total || 0,
    });
  } catch (err) {
    console.error("Error fetching admin stats:", err);
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
};

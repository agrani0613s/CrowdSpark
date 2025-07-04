import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  phone: String,
  occupation: String,
  profilePic: { 
    type: String, 
    default: '' 
  },
  donations: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Donation' 
  }],
  fundraisers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Campaign' }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;

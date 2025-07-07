import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// REGISTER
export const registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      phone: phone || "",
      // occupation: occupation || "",
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      user: {
        _id: newUser._id, // ✅ fixed
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin || false, // optional: support for role
        phone: newUser.phone,       // Include these
        // occupation: newUser.occupation,
        profilePic: newUser.profilePic, // Include this

      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      user: {
        _id: user._id, // ✅ fixed
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin || false, // optional
        phone: user.phone,             // Include these
        // occupation: user.occupation,
        profilePic: user.profilePic,
      },
      token,
      message: "Login successful",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  const userId = req.user.id; // populated from auth middleware
  const { name, phone, occupation, profilePic } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        phone,
        occupation,
        profilePic,
      },
      { new: true } // return updated doc
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin || false,
        phone: updatedUser.phone,
        profilePic: updatedUser.profilePic || "",
      },
      message: "Profile updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


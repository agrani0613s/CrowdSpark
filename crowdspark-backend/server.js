import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Express app setup
const app = express();

// Path configuration for ES Modules (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Allowed CORS origins (for dev + production)
const allowedOrigins = [
  "http://localhost:5173",                            // Vite dev
  "https://crowd-spark-umber.vercel.app"           // ✅ Replace with actual frontend URL if custom domain
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

// Static files (uploads folder)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Import routes
import campaignRoutes from "./routes/campaignRoutes.js";
import authRoutes from './routes/authRoutes.js';
import geminiRoutes from './routes/geminiRoutes.js';
import donationRoutes from "./routes/donations.js";
import userRoutes from './routes/userRoutes.js';
import suggestionRoutes from './routes/suggestionRoutes.js';

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api', geminiRoutes);
app.use('/api', suggestionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/donations', donationRoutes);

// Health check route
app.get('/api/auth/test', (req, res) => {
  res.send('Backend is working');
});

// Optional homepage route (for Render root URL)
app.get("/", (req, res) => {
  res.send("🎉 CrowdSpark Backend is Running");
});

// MongoDB connection + server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection failed:", err);
  });

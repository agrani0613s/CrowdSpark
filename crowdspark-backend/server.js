import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import connectDB from "./config/db.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import authRoutes from './routes/authRoutes.js'; // use .js explicitly
// import gemini from './routes/geminiRoutes.js';
import geminiRoutes from './routes/geminiRoutes.js';
import donationRoutes from "./routes/donations.js";
import userRoutes from './routes/userRoutes.js';
// import suggestionRoutes from './routes/suggestionRoutes.js'
import suggestionRoutes from './routes/suggestionRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use("/api/campaigns", campaignRoutes);

//gemini 
app.use('/api', geminiRoutes);
//suggested campaign
app.use('/api', suggestionRoutes);

// Serve profile pics
app.use('/api/users', userRoutes);
app.use('/uploads', express.static('uploads')); 

app.use("/api/donations", donationRoutes);

// MongoDB + Server Start
mongoose.connect(process.env.MONGO_URI, { 
  // useNewUrlParser: true, useUnifiedTopology: true 
})
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.log(err));


import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


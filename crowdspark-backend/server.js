import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import connectDB from "./config/db.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import mongoose from 'mongoose';
// import openaiRoutes from './routes/openaiRoutes.js';
import geminiRoutes from './routes/geminiRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());


// Routes
app.use("/api/campaigns", campaignRoutes);
//gemini 
app.use('/api', geminiRoutes);

// MongoDB + Server Start
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

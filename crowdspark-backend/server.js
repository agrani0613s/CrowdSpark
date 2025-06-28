import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import campaignRoutes from "./routes/campaignRoutes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());


// Routes
app.use("/api/campaigns", campaignRoutes);

// MongoDB + Server Start
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

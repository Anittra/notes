// 🔥 ENV LOAD
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.join(__dirname, ".env") });

// Debug
console.log("ENV CHECK:", process.env.MONGO_URI);

// Imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import noteRoutes from "./routes/notes.js";
import authRoutes from "./routes/auth.js";

const app = express();

// 🔥 CORS FIX (VERY IMPORTANT)
app.use(cors({
  origin: "*", // allow all (safe for now)
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected ✅"))
  .catch(err => console.log("Mongo Error ❌:", err));

// Test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`);
});
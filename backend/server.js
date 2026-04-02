// 🔥 ENV LOAD (FULL PATH FIX)
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file from backend folder
dotenv.config({ path: path.join(__dirname, ".env") });

// 🔍 Debug check
console.log("ENV CHECK:", process.env.MONGO_URI);

// باقي imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import noteRoutes from "./routes/notes.js";
import authRoutes from "./routes/auth.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔗 MongoDB Atlas connection
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
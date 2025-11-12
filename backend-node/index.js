import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

// ===============================================
// MongoDB Connection
// ===============================================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB is Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });

// ===============================================
// Express App Setup
// ===============================================
const app = express();

app.use(express.json());

// ✅ Allow requests from frontend (Vite on port 5173)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// ===============================================
// Routes
// ===============================================
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

app.use("/api/todo", todoRoutes);

// ===============================================
// Error Handling Middleware
// ===============================================
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// ===============================================
// Start Server
// ===============================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

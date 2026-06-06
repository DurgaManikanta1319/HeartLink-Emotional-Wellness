require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const moodRoutes = require("./routes/moods");
const chatRoutes = require("./routes/chat");

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Middleware
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/chat", chatRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/heartlink")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

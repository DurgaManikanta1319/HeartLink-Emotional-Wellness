const mongoose = require("mongoose");

const MoodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  emotion: {
    type: String,
    required: true,
  },
  intensity: {
    type: Number,
    default: 5,
  },
  note: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Mood", MoodSchema);

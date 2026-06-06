const express = require("express");
const Mood = require("../models/Mood");
const auth = require("../middleware/auth");

const router = express.Router();

// @route   POST /api/mood
// @desc    Add a new mood entry
// @access  Private
router.post("/", auth, async (req, res) => {
  console.log("POST /api/mood hit", req.body);
  try {
    const { emotion, intensity, note } = req.body;

    const newMood = new Mood({
      userId: req.user.id,
      emotion,
      intensity,
      note,
    });

    const mood = await newMood.save();
    console.log("Mood saved successfully:", mood);
    res.json(mood);
  } catch (err) {
    console.error("POST /api/mood error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route   GET /api/moods
// @desc    Get all mood entries for the user
// @access  Private
router.get("/", auth, async (req, res) => {
  console.log("GET /api/mood hit for user:", req.user.id);
  try {
    const moods = await Mood.find({ userId: req.user.id }).sort({ timestamp: -1 });
    console.log(`Found ${moods.length} moods`);
    res.json(moods);
  } catch (err) {
    console.error("GET /api/mood error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// @route   DELETE /api/mood/:id
// @desc    Delete a mood entry for the logged-in user
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  console.log("DELETE /api/mood/:id hit", req.params.id);
  try {
    const deletedMood = await Mood.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deletedMood) {
      return res.status(404).json({ message: "Mood entry not found" });
    }

    res.json({ message: "Mood entry deleted successfully", id: req.params.id });
  } catch (err) {
    console.error("DELETE /api/mood/:id error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;

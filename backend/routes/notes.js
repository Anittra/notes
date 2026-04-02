import express from "express";
import Note from "../models/Note.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// 📌 GET NOTES (USER BASED)
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes" });
  }
});

// 📌 ADD NOTE
router.post("/", auth, async (req, res) => {
  try {
    const { text } = req.body;

    const note = new Note({
      text,
      user: req.user.id   // 🔥 IMPORTANT
    });

    await note.save();

    res.json(note);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error saving note" });
  }
});

// 📌 UPDATE NOTE
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating note" });
  }
});

// 📌 DELETE NOTE
router.delete("/:id", auth, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting note" });
  }
});

export default router;
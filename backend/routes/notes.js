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
    console.log("GET ERROR:", err.message);
    res.status(500).json({ message: "Error fetching notes" });
  }
});

// 📌 ADD NOTE
router.post("/", auth, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const note = new Note({
      text,
      user: req.user.id
    });

    await note.save();

    res.json(note);

  } catch (err) {
    console.log("SAVE ERROR:", err.message);
    res.status(500).json({ message: "Error saving note" });
  }
});

// 📌 UPDATE NOTE (ONLY OWNER)
router.put("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    note.text = req.body.text || note.text;

    const updated = await note.save();

    res.json(updated);

  } catch (err) {
    console.log("UPDATE ERROR:", err.message);
    res.status(500).json({ message: "Error updating note" });
  }
});

// 📌 DELETE NOTE (ONLY OWNER)
router.delete("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await note.deleteOne();

    res.json({ message: "Deleted" });

  } catch (err) {
    console.log("DELETE ERROR:", err.message);
    res.status(500).json({ message: "Error deleting note" });
  }
});

export default router;
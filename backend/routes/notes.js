import express from "express";
const router = express.Router();

let notes = [];

// 📌 GET ALL NOTES
router.get("/", (req, res) => {
  res.json(notes);
});

// 📌 ADD NOTE
router.post("/", (req, res) => {
  const newNote = {
    _id: Date.now().toString(),
    text: req.body.text
  };

  notes.unshift(newNote);
  res.json(newNote);
});

// 📌 UPDATE NOTE ✏️
router.put("/:id", (req, res) => {
  const { text } = req.body;

  notes = notes.map(note =>
    note._id === req.params.id
      ? { ...note, text }
      : note
  );

  res.json({ message: "Note updated" });
});

// 📌 DELETE NOTE ❌
router.delete("/:id", (req, res) => {
  notes = notes.filter(n => n._id !== req.params.id);
  res.json({ message: "Deleted" });
});

// UPDATE NOTE
router.put("/:id", async (req, res) => {
  const updated = await Note.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text },
    { new: true }
  );
  res.json(updated);
});



export default router;
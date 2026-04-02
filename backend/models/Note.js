import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Untitled"
  },
  text: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: "bg-yellow-200"
  },
  pinned: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Note", noteSchema);
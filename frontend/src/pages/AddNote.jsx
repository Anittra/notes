import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api/notes";

export default function AddNote() {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const saveNote = async () => {
    if (!text) return;

    try {
      await axios.post(API, { text }); // ✅ NO TOKEN
      alert("Note saved ");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to save ");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-white/10 p-6 rounded-xl border border-yellow-500 w-[400px]">

        <h2 className="text-yellow-400 mb-4 text-center">Add Note</h2>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your note..."
          className="w-full p-3 rounded bg-black/40 mb-3"
          rows={5}
        />

        <button
          onClick={saveNote}
          className="bg-yellow-500 w-full p-2 rounded text-black"
        >
          Save
        </button>

      </div>
    </div>
  );
}
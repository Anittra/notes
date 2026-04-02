import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API = "https://notesai-backend-rs0t.onrender.com/api/notes";

export default function EditNote() {
  const { id } = useParams();
  const [text, setText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(API).then(res => {
      const note = res.data.find(n => n._id === id);
      if (note) setText(note.text);
    });
  }, [id]);

  const updateNote = async () => {
    await axios.put(`${API}/${id}`, { text });
    alert("Updated ");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-white/10 p-6 rounded-xl border border-yellow-500 w-[400px]">
        <h2 className="text-yellow-400 mb-4 text-center">Edit Note</h2>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 rounded bg-black/40 mb-3"
          rows={5}
        />

        <button
          onClick={updateNote}
          className="bg-yellow-500 w-full p-2 rounded text-black"
        >
          Update
        </button>
      </div>
    </div>
  );
}
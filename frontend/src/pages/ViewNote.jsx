import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API = "http://https://notesai-backend-rs0t.onrender.com/api/notes";

export default function ViewNote() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(API)
      .then(res => {
        const found = res.data.find(n => n._id === id);
        setNote(found);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!note) return <p className="text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">

      <div className="w-[500px] bg-white/10 p-6 rounded-xl border border-yellow-500">

        <h2 className="text-yellow-400 mb-4 text-xl">📄 Note</h2>

        <p className="mb-4">{note.text}</p>

        <button
          onClick={() => navigate("/")}
          className="bg-yellow-500 px-4 py-2 rounded text-black"
        >
          Back
        </button>

      </div>
    </div>
  );
}
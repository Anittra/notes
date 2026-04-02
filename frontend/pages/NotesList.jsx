import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://https://notesai-backend-rs0t.onrender.com/api/notes";

export default function NotesList({ token, logout }) {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(API, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setNotes(res.data))
    .catch(err => console.error(err));
  }, [token]);

  const filteredNotes = notes.filter(note =>
    note.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-yellow-400 font-bold">👑 Notes</h1>

        <input
          placeholder="Search..."
          className="w-[40%] p-2 rounded bg-black/40 border border-gray-600 text-center"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2">
          <Link to="/add" className="bg-yellow-500 px-4 py-1 rounded text-black">
            + Add
          </Link>

          <button onClick={logout} className="bg-red-500 px-4 py-1 rounded text-white">
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {filteredNotes.map(note => (
          <div
            key={note._id}
            onClick={() => navigate(`/view/${note._id}`)}
            className="aspect-square bg-black/40 border border-gray-700 rounded-xl p-4 cursor-pointer hover:border-yellow-400 flex items-center justify-center text-center"
          >
            <p>{note.text}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
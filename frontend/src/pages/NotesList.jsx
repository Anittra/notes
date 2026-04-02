import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(notes.filter(n => n._id !== id));
    } catch (err) {
      alert("Delete failed ❌");
    }
  };

  const filteredNotes = notes.filter(note =>
    note.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white p-6">

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-yellow-400 text-2xl font-bold">👑 Notes</h1>

        <input
          placeholder="Search..."
          className="w-[40%] p-2 rounded bg-black/40 border border-gray-600 text-center"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            onClick={() => navigate("/add")}
            className="bg-yellow-500 px-4 py-1 rounded text-black"
          >
            + Add
          </button>

          <button
            onClick={logout}
            className="bg-red-500 px-4 py-1 rounded text-white"
          >
            Logout
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-4 gap-4">
        {filteredNotes.map(note => (
          <div
            key={note._id}
            className="relative aspect-square bg-black/40 border border-gray-700 rounded-xl p-4 hover:border-yellow-400 transition"
          >
            {/* TEXT */}
            <div
              onClick={() => navigate(`/view/${note._id}`)}
              className="cursor-pointer h-full flex items-center justify-center text-center"
            >
              <p>{note.text}</p>
            </div>

            {/* DELETE BUTTON */}
            <button
              onClick={() => deleteNote(note._id)}
              className="absolute top-2 right-2 text-red-400 hover:text-red-600"
            >
              ❌
            </button>

            {/* EDIT BUTTON */}
            <button
              onClick={() => navigate(`/edit/${note._id}`)}
              className="absolute bottom-2 right-2 text-yellow-400"
            >
              
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}
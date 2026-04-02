import { useState } from "react";
import axios from "axios";

const API = "https://notesai-backend-rs0t.onrender.com/api/notes";

export default function AddNote() {
  const [text, setText] = useState("");

  const saveNote = async () => {
    alert("Clicked 🔥"); // 🔥 test

    if (!text) return;

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        API,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Saved ✅");
    } catch (err) {
      console.log(err);
      alert("Failed ❌");
    }
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      
      <h2>Add Note</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type note..."
        style={{ width: "300px", height: "100px" }}
      />

      <br /><br />

      <button
        onClick={saveNote}
        style={{
          padding: "10px 20px",
          cursor: "pointer"
        }}
      >
        Save
      </button>

    </div>
  );
}
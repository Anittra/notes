import { useState } from "react";
import axios from "axios";

export default function Login({ setToken, setPage }) { // ✅ setPage add pannom
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("https://notesai-backend-rs0t.onrender.com/api/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
    } catch (err) {
      alert("Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-white/10 p-6 rounded-xl border border-yellow-500 w-[300px]">

        <h2 className="text-yellow-400 mb-3 text-center">Login 👑</h2>

        <input
          placeholder="Email"
          className="w-full mb-2 p-2 rounded bg-black/40"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full mb-3 p-2 rounded bg-black/40"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-yellow-500 w-full p-2 rounded text-black mb-2"
        >
          Login
        </button>

        {/* 👇 NEW: Go to Register */}
        <p
          className="text-sm text-center cursor-pointer text-gray-300"
          onClick={() => setPage("register")}
        >
          Don't have account? Signup 
        </p>

      </div>
    </div>
  );
}
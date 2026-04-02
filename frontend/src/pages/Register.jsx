import { useState } from "react";
import axios from "axios";

export default function Register({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // 🔥 NEW

  const register = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/auth/signup", {
        email,
        password
      });

      alert("Signup success 👑");
      setPage("login");

    } catch (err) {
      console.error(err);

      // 🔥 show backend error message
      alert(
        err.response?.data?.message || "Signup failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-white/10 p-6 rounded-xl border border-yellow-500 w-[320px]">

        <h2 className="text-yellow-400 mb-4 text-center text-xl">
          Signup ✨
        </h2>

        <input
          placeholder="Email"
          className="w-full mb-2 p-2 rounded bg-black/40"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full mb-3 p-2 rounded bg-black/40"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={register}
          disabled={loading}
          className="bg-yellow-500 w-full p-2 rounded text-black mb-2"
        >
          {loading ? "Creating..." : "Signup"}
        </button>

        <p
          className="text-sm text-center cursor-pointer text-gray-300"
          onClick={() => setPage("login")}
        >
          Already have account? Login
        </p>
      </div>
    </div>
  );
}
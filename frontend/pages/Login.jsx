import { useState } from "react";
import axios from "axios";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      console.log("Login clicked");

      if (!email || !password) {
        alert("Enter email and password");
        return;
      }

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      // 👇 update app state
      if (setToken) setToken(res.data.token);

      alert("Login successfully");

    } catch (err) {
      console.error(err);
      alert("Login failed ");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">

      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-yellow-500 w-[350px] shadow-xl">

        <h2 className="text-2xl text-yellow-400 mb-4 text-center">
          Login
        </h2>

        <input
          placeholder="Email"
          className="w-full mb-3 p-2 rounded bg-black/40 border border-gray-600 focus:outline-none"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full mb-4 p-2 rounded bg-black/40 border border-gray-600 focus:outline-none"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-400"
        >
          Login
        </button>

      </div>
    </div>
  );
}
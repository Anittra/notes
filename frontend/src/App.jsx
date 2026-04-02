import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NotesList from "./pages/NotesList";
import AddNote from "./pages/AddNote";
import ViewNote from "./pages/ViewNote";
import EditNote from "./pages/EditNote";

import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [page, setPage] = useState("login"); // 🔥 NEW

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // 🔐 AUTH PAGES
  if (!token) {
    return page === "login" ? (
      <Login setToken={setToken} setPage={setPage} />
    ) : (
      <Register setPage={setPage} />
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<NotesList token={token} logout={logout} />} />
        <Route path="/add" element={<AddNote token={token} />} />
        <Route path="/view/:id" element={<ViewNote />} />
        <Route path="/edit/:id" element={<EditNote token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
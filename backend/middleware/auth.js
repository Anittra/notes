import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const authHeader = req.header("Authorization");

  // 🔥 check header format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "secretkey");

    req.user = decoded; // 🔥 contains { id: ... }

    next();

  } catch (err) {
    console.log("JWT ERROR:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
}
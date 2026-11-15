const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Username and password are required." });
    const [rows] = await db.execute("SELECT id, username, password FROM Users WHERE username = ?", [username]);
    if (!rows.length) return res.status(401).json({ message: "Invalid username or password." });
    const valid = await bcrypt.compare(password, rows[0].password);
    if (!valid) return res.status(401).json({ message: "Invalid username or password." });
    req.session.user = { id: rows[0].id, username: rows[0].username };
    res.json({ message: "Login successful.", user: req.session.user });
  } catch (err) { res.status(500).json({ message: "Login failed.", error: err.message }); }
};

exports.check = (req, res) => {
  res.json({ authenticated: Boolean(req.session.user), user: req.session.user || null });
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: "Could not log out." });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out." });
  });
};

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const db = require("./config/db");

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(session({
  name: "epms.sid",
  secret: process.env.SESSION_SECRET || "development_only_change_me",
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: "lax", secure: false, maxAge: 1000 * 60 * 60 * 4 }
}));

app.get("/", (req, res) => res.send("Smart Park EPMS API is running."));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/departments", require("./routes/departmentRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/salaries", require("./routes/salaryRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));

(async () => {
  try { await db.query("SELECT 1"); console.log("Connected to EPMS MySQL database."); }
  catch (e) { console.error("MySQL connection failed:", e.message); }
})();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

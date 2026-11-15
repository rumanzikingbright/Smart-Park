const db = require("../config/db");
exports.list = async (req, res) => {
  try { const [rows] = await db.query("SELECT * FROM Department ORDER BY DepartmentName"); res.json(rows); }
  catch (e) { res.status(500).json({ message: e.message }); }
};
exports.create = async (req, res) => {
  try {
    const { DepartmentCode, DepartmentName, GrossSalary, TotalDeduction } = req.body;
    if (!DepartmentCode || !DepartmentName || GrossSalary == null || TotalDeduction == null)
      return res.status(400).json({ message: "All department fields are required." });
    await db.execute("INSERT INTO Department (DepartmentCode, DepartmentName, GrossSalary, TotalDeduction) VALUES (?, ?, ?, ?)",
      [DepartmentCode, DepartmentName, Number(GrossSalary), Number(TotalDeduction)]);
    res.status(201).json({ message: "Department added." });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

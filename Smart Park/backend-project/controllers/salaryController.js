const db = require("../config/db");
exports.list = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT s.*, e.FirstName, e.LastName, e.Position, d.DepartmentName
      FROM Salary s JOIN Employee e ON e.employeeNumber=s.employeeNumber
      JOIN Department d ON d.DepartmentCode=e.DepartmentCode ORDER BY s.month DESC, s.salaryId DESC`);
    res.json(rows);
  } catch (e) { res.status(500).json({ message: e.message }); }
};
exports.create = async (req, res) => {
  try {
    const { employeeNumber, GrossSalary, TotalDeduction, month } = req.body;
    if (!employeeNumber || GrossSalary == null || TotalDeduction == null || !month)
      return res.status(400).json({ message: "Employee, gross salary, deduction and month are required." });
    const gross = Number(GrossSalary), deduction = Number(TotalDeduction);
    if (gross < 0 || deduction < 0 || deduction > gross) return res.status(400).json({ message: "Check salary amounts." });
    await db.execute("INSERT INTO Salary (employeeNumber, GrossSalary, TotalDeduction, NetSalary, month) VALUES (?, ?, ?, ?, ?)",
      [employeeNumber, gross, deduction, gross - deduction, month]);
    res.status(201).json({ message: "Salary record added." });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
exports.update = async (req, res) => {
  try {
    const { employeeNumber, GrossSalary, TotalDeduction, month } = req.body;
    const gross = Number(GrossSalary), deduction = Number(TotalDeduction);
    if (!employeeNumber || !month || !Number.isFinite(gross) || !Number.isFinite(deduction) || gross < 0 || deduction < 0 || deduction > gross)
      return res.status(400).json({ message: "Invalid salary details." });
    const [result] = await db.execute(`UPDATE Salary SET employeeNumber=?, GrossSalary=?, TotalDeduction=?, NetSalary=?, month=? WHERE salaryId=?`,
      [employeeNumber, gross, deduction, gross - deduction, month, req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: "Salary record not found." });
    res.json({ message: "Salary record updated." });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
exports.remove = async (req, res) => {
  try {
    const [result] = await db.execute("DELETE FROM Salary WHERE salaryId=?", [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: "Salary record not found." });
    res.json({ message: "Salary record deleted." });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

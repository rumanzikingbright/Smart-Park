const db = require("../config/db");
exports.monthly = async (req, res) => {
  try {
    const month = req.query.month;
    if (!month || !/^\d{4}-\d{2}$/.test(month)) return res.status(400).json({ message: "Provide month as YYYY-MM." });
    const [rows] = await db.execute(`SELECT e.FirstName, e.LastName, e.Position, d.DepartmentName, s.GrossSalary, s.TotalDeduction, s.NetSalary, s.month
      FROM Salary s JOIN Employee e ON e.employeeNumber=s.employeeNumber
      JOIN Department d ON d.DepartmentCode=e.DepartmentCode
      WHERE s.month=? ORDER BY e.LastName, e.FirstName`, [month]);
    res.json(rows);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

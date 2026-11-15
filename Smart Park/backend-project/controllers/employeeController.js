const db = require("../config/db");
exports.list = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT e.*, d.DepartmentName FROM Employee e
      JOIN Department d ON d.DepartmentCode=e.DepartmentCode ORDER BY e.LastName, e.FirstName`);
    res.json(rows);
  } catch (e) { res.status(500).json({ message: e.message }); }
};
exports.create = async (req, res) => {
  try {
    const { employeeNumber, FirstName, LastName, Position, Address, Telephone, Gender, hiredDate, DepartmentCode } = req.body;
    if (!employeeNumber || !FirstName || !LastName || !DepartmentCode)
      return res.status(400).json({ message: "Employee number, first name, last name and department are required." });
    await db.execute(`INSERT INTO Employee
      (employeeNumber, FirstName, LastName, Position, Address, Telephone, Gender, hiredDate, DepartmentCode)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [employeeNumber, FirstName, LastName, Position || null, Address || null, Telephone || null, Gender || null, hiredDate || null, DepartmentCode]);
    res.status(201).json({ message: "Employee registered." });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

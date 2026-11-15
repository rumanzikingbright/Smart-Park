import { useEffect, useState } from "react"; import api from "../services/api";
export default function Dashboard() {
  const [employees,setEmployees]=useState([]), [departments,setDepartments]=useState([]), [salaries,setSalaries]=useState([]);
  useEffect(()=>{ Promise.all([api.get("/employees"),api.get("/departments"),api.get("/salaries")]).then(([e,d,s])=>{setEmployees(e.data);setDepartments(d.data);setSalaries(s.data);}).catch(()=>{}); },[]);
  const total=salaries.reduce((sum,s)=>sum+Number(s.NetSalary||0),0);
  return <><h2 className="text-2xl font-bold">Dashboard</h2><p className="text-slate-500 mt-1">Smart Park payroll overview</p>
    <div className="grid gap-4 mt-6 sm:grid-cols-2 xl:grid-cols-3">{[["Employees",employees.length],["Departments",departments.length],["Payroll records",salaries.length],["Net payroll (loaded records)",`RWF ${total.toLocaleString()}`]].map(([label,value])=><div className="panel" key={label}><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold">{value}</p></div>)}</div>
    <div className="panel mt-6"><h3 className="font-semibold">Welcome to Smart Park EPMS</h3><p className="mt-2 text-sm text-slate-600">Use the menu to register employees, manage departments, record salaries and generate monthly payroll reports.</p></div>
  </>;
}

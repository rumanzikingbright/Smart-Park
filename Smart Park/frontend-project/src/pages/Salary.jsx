import { useEffect, useState } from "react"; import api from "../services/api";
const blank={employeeNumber:"",GrossSalary:"",TotalDeduction:"",month:""};
export default function Salary(){
 const [form,setForm]=useState(blank),[employees,setEmployees]=useState([]),[rows,setRows]=useState([]),[editing,setEditing]=useState(null),[msg,setMsg]=useState("");
 const load=()=>api.get("/salaries").then(r=>setRows(r.data)).catch(e=>setMsg(e.response?.data?.message||"Could not load salaries."));
 useEffect(()=>{api.get("/employees").then(r=>setEmployees(r.data));load()},[]);
 const change=e=>setForm({...form,[e.target.name]:e.target.value});
 const submit=async e=>{e.preventDefault();try{if(editing)await api.put(`/salaries/${editing}`,form);else await api.post("/salaries",form);setForm(blank);setEditing(null);setMsg("Salary saved.");load()}catch(err){setMsg(err.response?.data?.message||"Save failed.")}};
 const edit=r=>{setEditing(r.salaryId);setForm({employeeNumber:r.employeeNumber,GrossSalary:r.GrossSalary,TotalDeduction:r.TotalDeduction,month:r.month})};
 const remove=async id=>{if(!confirm("Delete this salary record?"))return;try{await api.delete(`/salaries/${id}`);load()}catch(e){setMsg(e.response?.data?.message||"Delete failed.")}};
 return <><h2 className="text-2xl font-bold mb-5">Salary</h2><form onSubmit={submit} className="panel grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
 <label className="text-sm">Employee<select required name="employeeNumber" value={form.employeeNumber} onChange={change}><option value="">Choose employee</option>{employees.map(e=><option key={e.employeeNumber} value={e.employeeNumber}>{e.employeeNumber} - {e.FirstName} {e.LastName}</option>)}</select></label>
 {["GrossSalary","TotalDeduction"].map(k=><label className="text-sm" key={k}>{k}<input required type="number" min="0" name={k} value={form[k]} onChange={change}/></label>)}
 <label className="text-sm">Month<input required type="month" name="month" value={form.month} onChange={change}/></label>
 <div className="flex gap-2"><button className="btn">{editing?"Update salary":"Add salary"}</button>{editing&&<button type="button" className="rounded-lg border px-4" onClick={()=>{setEditing(null);setForm(blank)}}>Cancel</button>}</div>{msg&&<p className="text-sm">{msg}</p>}</form>
 <div className="panel mt-5 overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left border-b"><th className="p-2">Employee</th><th>Month</th><th>Gross</th><th>Deduction</th><th>Net</th><th>Actions</th></tr></thead><tbody>{rows.map(r=><tr className="border-b" key={r.salaryId}><td className="p-2">{r.FirstName} {r.LastName}</td><td>{r.month}</td><td>{r.GrossSalary}</td><td>{r.TotalDeduction}</td><td>{r.NetSalary}</td><td className="space-x-2"><button className="text-blue-700" onClick={()=>edit(r)}>Edit</button><button className="text-red-700" onClick={()=>remove(r.salaryId)}>Delete</button></td></tr>)}</tbody></table></div></>;
}

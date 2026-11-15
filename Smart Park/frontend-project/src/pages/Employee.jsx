import { useEffect, useState } from "react"; import api from "../services/api";
const initial={employeeNumber:"",FirstName:"",LastName:"",Position:"",Address:"",Telephone:"",Gender:"",hiredDate:"",DepartmentCode:""};
export default function Employee(){
 const [form,setForm]=useState(initial),[rows,setRows]=useState([]),[msg,setMsg]=useState("");
 const load=()=>api.get("/employees").then(r=>setRows(r.data)).catch(e=>setMsg(e.response?.data?.message||"Could not load employees."));
 useEffect(()=>{load()},[]);
 const change=e=>setForm({...form,[e.target.name]:e.target.value});
 const submit=async e=>{e.preventDefault();setMsg("");try{await api.post("/employees",form);setForm(initial);setMsg("Employee registered.");load()}catch(err){setMsg(err.response?.data?.message||"Save failed.")}};
 return <><h2 className="text-2xl font-bold mb-5">Employees</h2><form onSubmit={submit} className="panel grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
 {Object.keys(initial).map(k=><label className="text-sm" key={k}>{k}<input name={k} type={k==="hiredDate"?"date":"text"} value={form[k]} onChange={change} required={["employeeNumber","FirstName","LastName","DepartmentCode"].includes(k)}/></label>)}
 <div className="sm:col-span-2 lg:col-span-3"><button className="btn">Register employee</button></div>{msg&&<p className="text-sm">{msg}</p>}</form>
 <div className="panel mt-5 overflow-x-auto"><h3 className="font-semibold mb-3">Registered employees</h3><table className="w-full text-sm"><thead><tr className="text-left border-b"><th className="p-2">Number</th><th>Name</th><th>Position</th><th>Department</th></tr></thead><tbody>{rows.map(r=><tr className="border-b" key={r.employeeNumber}><td className="p-2">{r.employeeNumber}</td><td>{r.FirstName} {r.LastName}</td><td>{r.Position}</td><td>{r.DepartmentName}</td></tr>)}</tbody></table></div></>;
}

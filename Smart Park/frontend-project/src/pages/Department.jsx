import { useEffect, useState } from "react"; import api from "../services/api";
const initial={DepartmentCode:"",DepartmentName:"",GrossSalary:"",TotalDeduction:""};
export default function Department(){
 const [form,setForm]=useState(initial),[rows,setRows]=useState([]),[msg,setMsg]=useState("");
 const load=()=>api.get("/departments").then(r=>setRows(r.data)).catch(e=>setMsg(e.response?.data?.message||"Could not load departments."));
 useEffect(()=>{load()},[]);
 const submit=async e=>{e.preventDefault();try{await api.post("/departments",form);setForm(initial);setMsg("Department added.");load()}catch(err){setMsg(err.response?.data?.message||"Save failed.")}};
 return <><h2 className="text-2xl font-bold mb-5">Departments</h2><form onSubmit={submit} className="panel grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{Object.keys(initial).map(k=><label className="text-sm" key={k}>{k}<input required name={k} type={k.includes("Salary")||k==="TotalDeduction"?"number":"text"} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}/></label>)}<button className="btn">Add department</button>{msg&&<p className="text-sm">{msg}</p>}</form>
 <div className="panel mt-5 overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left border-b"><th className="p-2">Code</th><th>Name</th><th>Gross salary</th><th>Deduction</th></tr></thead><tbody>{rows.map(r=><tr className="border-b" key={r.DepartmentCode}><td className="p-2">{r.DepartmentCode}</td><td>{r.DepartmentName}</td><td>{r.GrossSalary}</td><td>{r.TotalDeduction}</td></tr>)}</tbody></table></div></>;
}

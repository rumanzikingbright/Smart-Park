import { useState } from "react"; import api from "../services/api";
export default function Reports(){
 const [month,setMonth]=useState(new Date().toISOString().slice(0,7)),[rows,setRows]=useState([]),[msg,setMsg]=useState("");
 const generate=async e=>{e.preventDefault();try{const r=await api.get("/reports/monthly",{params:{month}});setRows(r.data);setMsg(`${r.data.length} payroll record(s) found.`)}catch(err){setMsg(err.response?.data?.message||"Could not generate report.")}};
 const total=rows.reduce((s,r)=>s+Number(r.NetSalary),0);
 return <><h2 className="text-2xl font-bold mb-5">Monthly payroll report</h2><form onSubmit={generate} className="panel flex flex-wrap items-end gap-3"><label className="text-sm">Payment month<input type="month" value={month} onChange={e=>setMonth(e.target.value)}/></label><button className="btn">Generate report</button><span className="text-sm text-slate-500">{msg}</span></form>
 <div className="panel mt-5 overflow-x-auto"><div className="mb-3 flex justify-between"><h3 className="font-semibold">Payroll: {month}</h3><strong>Net total: RWF {total.toLocaleString()}</strong></div><table className="w-full text-sm"><thead><tr className="text-left border-b"><th className="p-2">Employee</th><th>Position</th><th>Department</th><th>Net salary</th></tr></thead><tbody>{rows.map((r,i)=><tr className="border-b" key={i}><td className="p-2">{r.FirstName} {r.LastName}</td><td>{r.Position}</td><td>{r.DepartmentName}</td><td>{Number(r.NetSalary).toLocaleString()}</td></tr>)}</tbody></table></div></>;
}

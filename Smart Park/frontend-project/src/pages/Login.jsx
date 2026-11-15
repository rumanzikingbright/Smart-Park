import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(""); const { login } = useAuth(); const navigate = useNavigate();
  const submit = async e => { e.preventDefault(); setError(""); try { await login(form); navigate("/"); } catch (err) { setError(err.response?.data?.message || "Login failed."); } };
  return <div className="min-h-screen flex items-center justify-center p-4"><form onSubmit={submit} className="panel w-full max-w-md space-y-4">
    <div><p className="text-sm font-semibold text-blue-700">SMARTPARK</p><h1 className="text-2xl font-bold">EPMS Login</h1><p className="text-sm text-slate-500">Sign in to manage employee payroll.</p></div>
    {error && <p className="rounded bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    <label className="block text-sm">Username<input required value={form.username} onChange={e=>setForm({...form,username:e.target.value})} /></label>
    <label className="block text-sm">Password<input required type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} /></label>
    <button className="btn w-full">Sign in</button>
  </form></div>;
}

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const links = [["/", "Dashboard"], ["/employees", "Employee"], ["/departments", "Department"], ["/salaries", "Salary"], ["/reports", "Reports"]];
export default function Layout() {
  const { user, logout } = useAuth(); const navigate = useNavigate();
  const signOut = async () => { await logout(); navigate("/login"); };
  return <div className="min-h-screen md:flex">
    <aside className="bg-slate-900 text-white md:w-64 p-5">
      <h1 className="text-xl font-bold">Smart Park EPMS</h1><p className="text-xs text-slate-400 mt-1">Payroll Management</p>
      <nav className="mt-8 space-y-2">{links.map(([to, label]) => <NavLink key={to} to={to} end={to === "/"} className={({isActive}) => `block rounded-lg px-3 py-2 ${isActive ? "bg-blue-700" : "hover:bg-slate-800"}`}>{label}</NavLink>)}</nav>
      <button onClick={signOut} className="mt-8 text-sm text-slate-300 hover:text-white">Logout ({user?.username})</button>
    </aside>
    <main className="flex-1 p-5 md:p-8"><Outlet /></main>
  </div>;
}

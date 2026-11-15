import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login"; import Dashboard from "./pages/Dashboard";
import Employee from "./pages/Employee"; import Department from "./pages/Department";
import Salary from "./pages/Salary"; import Reports from "./pages/Reports";
export default function App(){return <AuthProvider><BrowserRouter><Routes>
 <Route path="/login" element={<Login/>}/>
 <Route element={<ProtectedRoute><Layout/></ProtectedRoute>}>
  <Route path="/" element={<Dashboard/>}/><Route path="/employees" element={<Employee/>}/>
  <Route path="/departments" element={<Department/>}/><Route path="/salaries" element={<Salary/>}/>
  <Route path="/reports" element={<Reports/>}/>
 </Route><Route path="*" element={<Navigate to="/" replace/>}/>
 </Routes></BrowserRouter></AuthProvider>}

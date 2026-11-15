import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function ProtectedRoute({ children }) {
  const { user, checking } = useAuth();
  if (checking) return <p className="p-8">Checking session...</p>;
  return user ? children : <Navigate to="/login" replace />;
}

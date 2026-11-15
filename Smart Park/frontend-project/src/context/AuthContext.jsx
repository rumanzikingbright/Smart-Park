import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  useEffect(() => { api.get("/auth/check").then(r => setUser(r.data.user)).catch(() => setUser(null)).finally(() => setChecking(false)); }, []);
  const login = async (credentials) => { const r = await api.post("/auth/login", credentials); setUser(r.data.user); };
  const logout = async () => { await api.post("/auth/logout"); setUser(null); };
  return <AuthContext.Provider value={{ user, login, logout, checking }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);

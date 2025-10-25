import { createContext, useEffect, useState } from "react";

type User = { id: number; nombre: string; role: "admin" | "voter" };
type AuthState = { user: User | null; token: string | null };

export const AuthContext = createContext<{
  auth: AuthState;
  login: (t: string, u: User) => void;
  logout: () => void;
}>({ auth: { user: null, token: null }, login: () => {}, logout: () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({ user: null, token: null });

  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");
    if (t && u) setAuth({ token: t, user: JSON.parse(u) });
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuth({ token, user });
  };
  const logout = () => {
    localStorage.clear();
    setAuth({ token: null, user: null });
    window.location.href = "/login";
  };

  return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
}
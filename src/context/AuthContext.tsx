import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string; // <--- YEH ADD KAREIN
  token?: string;
}

type LoginData = User & { token: string };

interface AuthContextType {
  user: User | null;
  login: (data: LoginData) => User;
  logout: () => void;
  updateUser: (data: User) => void; // <--- YEH ADD KAREIN
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const readUser = (): User | null => {
  try {
    const raw = localStorage.getItem("user");
    if (raw && raw !== "undefined") {
      return JSON.parse(raw);
    }
    return null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readUser);
  const navigate = useNavigate();

  const login = (data: LoginData) => {
    const { token, ...userData } = data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    if (userData.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }

    return userData;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login", { replace: true });
  };

  // YEH FUNCTION ADD KAREIN
  const updateUser = (data: User) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

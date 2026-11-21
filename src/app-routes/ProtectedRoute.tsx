import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  adminOnly?: boolean;
}

export default function ProtectedRoute({
  adminOnly = false,
}: ProtectedRouteProps) {
  const token = localStorage.getItem("token");

  let user: { role?: string } = {};
  try {
    user = JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    user = {};
  }

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not an admin
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ShieldAlert,
  Moon,
  Sun,
} from "lucide-react"; // Moon aur Sun import kiye
import type { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext"; // useTheme import kiya

export default function AdminLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme(); // Theme state nikali
  const navigate = useNavigate();

  const adminNavItems = [
    { name: "Overview", path: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Manage Users", path: "/admin/users", icon: <Users size={20} /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-slate-950 w-full overflow-hidden font-sans transition-colors">
      {/* SIDEBAR */}
      <div className="w-[260px] bg-[#0F172A] text-white flex flex-col justify-between py-6 shrink-0 border-r border-slate-800">
        <div>
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 px-6 mb-10 hover:opacity-80 transition-opacity cursor-pointer group"
          >
            <div className="bg-[#5C4EE5] p-2 rounded-xl shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <ShieldAlert size={24} className="text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">Admin Panel</div>
              <div className="text-xs text-slate-400">SpendWise System</div>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="flex flex-col gap-2 px-4">
            {adminNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-[#5C4EE5] text-white font-medium shadow-md shadow-indigo-500/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="px-4 flex flex-col gap-2">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 transition-all rounded-xl hover:bg-red-500/10"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* TOP NAVBAR */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10 shrink-0 transition-colors">
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
            System Administration
          </div>

          <div className="flex items-center gap-4">
            {/* DARK MODE TOGGLE BUTTON YAHAN ADD KIYA HAI */}
            <button
              onClick={toggleTheme}
              className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              title="Toggle Theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>

            {/* User Profile */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600 dark:text-slate-300">
                Hi, {user?.name || "Admin"}
              </span>
              <div className="h-9 w-9 bg-gradient-to-br from-[#5C4EE5] to-[#8B5CF6] text-white rounded-full flex items-center justify-center font-bold shadow-sm">
                {user?.name?.charAt(0).toUpperCase() || "A"}
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-6 md:p-8 w-full">{children}</main>
      </div>
    </div>
  );
}

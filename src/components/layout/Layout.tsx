import { Link, useLocation } from "react-router-dom";
import {
  Wallet,
  LayoutDashboard,
  Receipt,
  PieChart,
  ShieldAlert,
} from "lucide-react";
import type { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { user } = useAuth();

  // User ke asal links
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: <Receipt size={20} />,
    },
    { name: "Budget", path: "/budget", icon: <PieChart size={20} /> },
  ];

  // Agar user Admin hai, toh usko Admin Panel ka link bhi dikhao
  if (user?.role === "admin") {
    navItems.push({
      name: "Admin Panel",
      path: "/admin",
      icon: <ShieldAlert size={20} />,
    });
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-slate-950 w-full overflow-hidden font-sans transition-colors">
      {/* Sidebar */}
      <div className="w-[260px] bg-[#0F172A] text-white flex flex-col justify-between py-6 shrink-0 border-r border-slate-800">
        <div>
          <div className="flex items-center gap-3 px-6 mb-10">
            <div className="bg-[#5C4EE5] p-2 rounded-xl">
              <Wallet size={24} className="text-white" />
            </div>
            <div
              className="text-xl font-bold tracking-wide"
              style={{ color: "#ffffff" }}
            >
              SpendWise
            </div>
          </div>

          <nav className="flex flex-col gap-2 px-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-[#5C4EE5] text-white font-medium shadow-md shadow-indigo-500/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Navbar />
        <main className="p-6 md:p-8 w-full">{children}</main>
      </div>
    </div>
  );
}

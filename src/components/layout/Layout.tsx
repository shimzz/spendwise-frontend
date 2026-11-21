import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Wallet,
  LayoutDashboard,
  Receipt,
  PieChart,
  ShieldAlert,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";

interface LayoutProps {
  children?: ReactNode;
}

const userNav = [
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

const adminNav = [
  { name: "Overview", path: "/admin", icon: <ShieldAlert size={20} /> },
  { name: "Users", path: "/admin/users", icon: <Users size={20} /> },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = user?.role === "admin" ? adminNav : userNav;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F8FAFC] font-sans dark:bg-slate-950">
      {/* Sidebar */}
      <aside className="hidden w-[260px] shrink-0 flex-col justify-between bg-[#0F172A] py-6 text-white md:flex">
        <div>
          <div className="mb-10 flex items-center gap-3 px-6">
            <div className="rounded-xl bg-[#5C4EE5] p-2">
              <Wallet size={24} className="text-white" />
            </div>
            <Link to="/">
              <span className="text-xl font-bold tracking-wide text-white">
                SpendWise
              </span>
            </Link>
          </div>

          <nav className="flex flex-col gap-2 px-4">
            {navItems.map((item) => {
              // "/admin" should only be active on the exact path,
              // otherwise it stays highlighted on /admin/users too
              const isActive =
                item.path === "/admin"
                  ? location.pathname === "/admin"
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                    isActive
                      ? "bg-[#5C4EE5] font-medium text-white shadow-md shadow-indigo-500/20"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <Navbar />
        <main className="w-full p-6 md:p-8">{children ?? <Outlet />}</main>
      </div>
    </div>
  );
}

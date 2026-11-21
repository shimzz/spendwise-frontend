import { useNavigate } from "react-router-dom";
import { Moon, Sun, LogOut, Bell, User, Settings } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const itemClass =
    "cursor-pointer gap-2 text-slate-700 focus:bg-slate-100 focus:text-slate-900 dark:text-slate-300 dark:focus:bg-slate-800 dark:focus:text-white";

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b bg-white px-8 transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
        Welcome back to SpendWise!
      </div>

      <div className="flex items-center gap-2">
        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-full p-2.5 text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          title="Toggle Theme"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className="relative cursor-pointer rounded-full p-2.5 text-slate-500 outline-none transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full border-2 border-white bg-red-500 dark:border-slate-900" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="mt-2 w-72 border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-slate-900 dark:text-white">
                Notifications
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-800" />
              <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
                <Bell className="mx-auto mb-2 opacity-50" size={24} />
                No new notifications.
              </div>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="mx-2 h-6 w-px bg-slate-200 dark:bg-slate-700" />

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="group flex cursor-pointer items-center gap-3 outline-none">
            <span className="hidden text-sm font-medium text-gray-600 transition-colors group-hover:text-[#5C4EE5] dark:text-slate-300 sm:block">
              Hi, {user?.name || "User"}
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#5C4EE5] to-[#8B5CF6] font-bold text-white shadow-md shadow-indigo-500/20 transition-transform group-hover:scale-105">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="mt-2 w-56 border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-slate-900 dark:text-white">
                    {user?.name}
                  </p>
                  <p className="text-xs leading-none text-slate-500 dark:text-slate-400">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-800" />

              <DropdownMenuItem
                onClick={() => navigate("/profile")}
                className={itemClass}
              >
                <User size={16} /> My Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => navigate("/settings")}
                className={itemClass}
              >
                <Settings size={16} /> Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-800" />

              <DropdownMenuItem
                onClick={logout}
                className="cursor-pointer gap-2 text-red-600 focus:bg-red-50 focus:text-red-600 dark:text-red-400 dark:focus:bg-red-500/10 dark:focus:text-red-400"
              >
                <LogOut size={16} /> Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

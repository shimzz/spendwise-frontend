import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Bell,
  Globe,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);

  return (
    <Layout>
      {/* Yahan max-w-4xl aur mx-auto hata diya hai */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full space-y-8"
      >
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 transition-colors">
          <h1 className="text-3xl font-extrabold text-[#0B1120] dark:text-white transition-colors flex items-center gap-3">
            <SettingsIcon className="text-[#5C4EE5]" size={32} /> Settings
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium transition-colors">
            Manage your app preferences and account settings.
          </p>
        </div>

        {/* Grid Layout taake screen par ache se phaile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Appearance Settings */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl p-6 md:p-8 transition-colors">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
              Appearance
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-700 dark:text-slate-300">
                  Theme Preference
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Switch between light and dark mode.
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {theme === "light" ? (
                  <>
                    <Moon size={18} /> Light
                  </>
                ) : (
                  <>
                    <Sun size={18} /> Dark
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Currency Settings */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl p-6 md:p-8 transition-colors">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <Globe size={20} /> Preferences
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <p className="font-semibold text-slate-700 dark:text-slate-300">
                  Default Currency
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Set your primary currency for tracking.
                </p>
              </div>
              <select className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-[#5C4EE5]">
                <option value="PKR">PKR - Pakistani Rupee</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="INR">INR - Indian Rupee</option>
              </select>
            </div>
          </div>

          {/* Notifications Settings (Yeh full width lega) */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl p-6 md:p-8 transition-colors">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <Bell size={20} /> Notifications
            </h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-300">
                    Email Alerts
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Receive weekly financial summary via email.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={() => setEmailAlerts(!emailAlerts)}
                  className="w-6 h-6 accent-[#5C4EE5] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-6">
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-300">
                    Budget Warnings
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Get notified when you reach 80% of your budget limit.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={budgetAlerts}
                  onChange={() => setBudgetAlerts(!budgetAlerts)}
                  className="w-6 h-6 accent-[#5C4EE5] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Danger Zone (Yeh bhi full width lega) */}
          <div className="lg:col-span-2 bg-rose-50 dark:bg-rose-500/5 rounded-3xl border border-rose-200 dark:border-rose-500/20 shadow-xl p-6 md:p-8 transition-colors">
            <h2 className="text-lg font-bold text-rose-600 dark:text-rose-400 mb-2 flex items-center gap-2">
              <ShieldAlert size={20} /> Danger Zone
            </h2>
            <p className="text-sm text-rose-500/80 dark:text-rose-400/80 mb-6">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <Button className="bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl h-12 px-6">
              Delete Account
            </Button>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}

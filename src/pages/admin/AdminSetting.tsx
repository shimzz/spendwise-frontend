import { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Settings, ShieldCheck, UserPlus, Globe, Loader2 } from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/context/CurrencyContext"; // <--- Import karein

export default function AdminSettings() {
  const { setCurrency } = useCurrency(); // <--- Hook use karein
  const [settings, setSettings] = useState<any>({
    maintenanceMode: false,
    allowRegistration: true,
    currency: "PKR",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/settings");
        setSettings(res.data);
      } catch (error) {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      await api.put("/settings", settings);

      // Yahan save hone ke baad foran currency change karein
      setCurrency(settings.currency);

      toast.success("Settings updated successfully!");
    } catch (error) {
      toast.error("Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex h-[80vh] items-center justify-center">
          <Loader2 className="animate-spin text-[#5C4EE5] h-10 w-10" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="w-full space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2 transition-colors">
            <Settings className="text-[#5C4EE5]" /> System Settings
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 transition-colors">
            Configure global application settings. Changes affect all users.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors overflow-hidden max-w-4xl">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-rose-50 dark:bg-rose-500/10 p-3 rounded-xl text-rose-500">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white">
                  Maintenance Mode
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Temporarily disable user access to the app.
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.maintenanceMode}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maintenanceMode: e.target.checked,
                  })
                }
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-rose-500"></div>
            </label>
          </div>

          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-500/10 p-3 rounded-xl text-[#5C4EE5]">
                <UserPlus size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white">
                  Allow New Registrations
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  If disabled, new users cannot create accounts.
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.allowRegistration}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    allowRegistration: e.target.checked,
                  })
                }
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#5C4EE5]"></div>
            </label>
          </div>

          <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-50 dark:bg-emerald-500/10 p-3 rounded-xl text-emerald-500">
                <Globe size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white">
                  Global Currency
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Set the default currency for the system.
                </p>
              </div>
            </div>
            <select
              value={settings.currency}
              onChange={(e) =>
                setSettings({ ...settings, currency: e.target.value })
              }
              className="h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-[#5C4EE5]"
            >
              <option value="PKR">PKR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#5C4EE5] hover:bg-[#4b3ec4] text-white px-8 h-11 rounded-xl font-bold"
            >
              {saving ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                "Save Settings"
              )}
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

import { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import api from "@/lib/api";
import { Loader2, ShieldAlert } from "lucide-react";
import AdminStats from "./AdminStats";
import UsersTable from "./UsersTable";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({
    totalUsers: 0,
    totalTransactions: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    try {
      const [usersRes, statsRes] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/stats"),
      ]);
      setUsers(usersRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error("Admin fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/admin/users/${id}`);
      fetchAdminData();
    } catch (error) {
      alert("Failed to delete user");
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
      {/* Yahan w-full space-y-8 hai, koi mx-auto ya max-w nahi hai */}
      <div className="w-full space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2 transition-colors">
            <ShieldAlert className="text-[#5C4EE5]" /> Admin Control Panel
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 transition-colors">
            Manage users and view system statistics.
          </p>
        </div>

        <AdminStats stats={stats} />
        <UsersTable users={users} onDelete={handleDeleteUser} />
      </div>
    </AdminLayout>
  );
}

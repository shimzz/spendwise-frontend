import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import api from "@/lib/api";
import { Loader2, ShieldAlert } from "lucide-react";
// Components Import karein
import AdminStats from "./AdminStats";
import UsersTable from "./UsersTable";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({
    totalUsers: 0,
    totalTransactions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex h-[80vh] items-center justify-center">
          <Loader2 className="animate-spin text-[#5C4EE5] h-10 w-10" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="text-[#5C4EE5]" /> Admin Control Panel
          </h1>
          <p className="text-slate-500 mt-1">
            Manage users and view system statistics.
          </p>
        </div>

        {/* Stats Component */}
        <AdminStats stats={stats} />

        {/* Users Table Component */}
        <UsersTable users={users} />
      </div>
    </Layout>
  );
}

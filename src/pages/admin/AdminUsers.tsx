import { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import api from "@/lib/api";
import { Loader2, Users } from "lucide-react";
import UsersTable from "./UsersTable";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/admin/users/${id}`);
      fetchUsers();
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
      <div className="w-full space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2 transition-colors">
            <Users className="text-[#5C4EE5]" /> Manage Users
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 transition-colors">
            View, manage and delete registered users from the system.
          </p>
        </div>

        <UsersTable users={users} onDelete={handleDeleteUser} />
      </div>
    </AdminLayout>
  );
}

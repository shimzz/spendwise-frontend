import { useEffect, useState } from "react";
import api from "@/lib/api";
import UsersTable from "./UsersTable";
import type { AdminUser } from "./UsersTable";
import Layout from "@/components/layout/Layout";
export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      const { data } = await api.get("/admin/users");
      setUsers(data);
    } catch {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleToggleBlock = async (id: string) => {
    try {
      await api.patch(`/admin/users/${id}/block`);
      loadUsers();
    } catch {
      setError("Could not update user status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this user and all their data?")) return;
    try {
      await api.delete(`/admin/users/${id}`);
      loadUsers();
    } catch {
      setError("Could not delete user");
    }
  };

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Users</h1>
        <p className="text-muted-foreground">Manage all registered users.</p>

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        <div className="mt-6">
          {loading ? (
            <p className="text-slate-400">Loading...</p>
          ) : (
            <UsersTable
              users={users}
              onToggleBlock={handleToggleBlock}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

import { Trash2 } from "lucide-react";

export default function UsersTable({
  users,
  onDelete,
}: {
  users: any[];
  onDelete: (id: string) => void;
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center transition-colors">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white transition-colors">
          User Management
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 transition-colors">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Joined On</th>
              <th className="px-6 py-4 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 transition-colors">
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-200 transition-colors">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400 transition-colors">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  {/* Yahan dark mode ke liye text aur bg color fix kiya hai */}
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${
                      user.role === "admin"
                        ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {user.role.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400 transition-colors">
                  {new Date(user.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 text-center">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => onDelete(user._id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                      title="Delete User"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

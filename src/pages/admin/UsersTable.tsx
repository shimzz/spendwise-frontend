export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isBlocked?: boolean;
  createdAt: string;
}

interface UsersTableProps {
  users: AdminUser[];
  title?: string;
  onToggleBlock?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function UsersTable({
  users,
  title = "All Registered Users",
  onToggleBlock,
  onDelete,
}: UsersTableProps) {
  const showActions = Boolean(onToggleBlock || onDelete);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 p-6">
        <h2 className="text-lg font-bold text-slate-800">{title}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Joined On</th>
              {showActions && (
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr
                key={user._id}
                className="transition-colors hover:bg-slate-50"
              >
                <td className="px-6 py-4 font-semibold text-slate-800">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-slate-500">{user.email}</td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      user.role === "admin"
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {user.role.toUpperCase()}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      user.isBlocked
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.isBlocked ? "BLOCKED" : "ACTIVE"}
                  </span>
                </td>

                <td className="px-6 py-4 text-slate-500">
                  {new Date(user.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                {showActions && (
                  <td className="px-6 py-4">
                    {user.role === "admin" ? (
                      <span className="block text-right text-xs text-slate-400">
                        Protected
                      </span>
                    ) : (
                      <div className="flex justify-end gap-2">
                        {onToggleBlock && (
                          <button
                            onClick={() => onToggleBlock(user._id)}
                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                          >
                            {user.isBlocked ? "Unblock" : "Block"}
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(user._id)}
                            className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td
                  colSpan={showActions ? 6 : 5}
                  className="px-6 py-10 text-center text-slate-400"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

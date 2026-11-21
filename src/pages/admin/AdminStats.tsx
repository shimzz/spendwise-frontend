import { Users, Receipt } from "lucide-react";

export default function AdminStats({ stats }: { stats: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="bg-indigo-100 p-4 rounded-xl text-[#5C4EE5]">
          <Users size={28} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">
            Total Registered Users
          </p>
          <h3 className="text-3xl font-bold text-slate-900">
            {stats.totalUsers}
          </h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="bg-emerald-100 p-4 rounded-xl text-emerald-600">
          <Receipt size={28} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">
            Total Transactions Logged
          </p>
          <h3 className="text-3xl font-bold text-slate-900">
            {stats.totalTransactions}
          </h3>
        </div>
      </div>
    </div>
  );
}

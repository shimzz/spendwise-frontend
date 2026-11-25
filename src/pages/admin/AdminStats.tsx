import { Users, Receipt } from "lucide-react";

export default function AdminStats({ stats }: { stats: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Card 1 */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 transition-colors">
        <div className="bg-indigo-100 dark:bg-indigo-500/20 p-4 rounded-xl text-[#5C4EE5] dark:text-indigo-400 transition-colors">
          <Users size={28} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors">
            Total Registered Users
          </p>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white transition-colors">
            {stats.totalUsers}
          </h3>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 transition-colors">
        <div className="bg-emerald-100 dark:bg-emerald-500/20 p-4 rounded-xl text-emerald-600 dark:text-emerald-400 transition-colors">
          <Receipt size={28} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors">
            Total Transactions Logged
          </p>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white transition-colors">
            {stats.totalTransactions}
          </h3>
        </div>
      </div>
    </div>
  );
}

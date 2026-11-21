import { useState, useEffect } from "react";
import { Loader2, MoreHorizontal, ArrowRight } from "lucide-react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import SummaryCards from "@/components/dashboard/SummaryCards";
import MonthlyBarChart from "@/components/dashboard/MonthlyBarChart";
import CategoryPieChart from "@/components/dashboard/CategoryPieChart";
import { getDashboardStats } from "@/services/statsService";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsData = await getDashboardStats();
        setData(statsData);
      } catch (error) {
        console.error("Error fetching stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
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

  const income = data?.totalIncome || 0;
  const expense = data?.totalExpense || 0;
  const balance = data?.balance || 0;

  const colors = [
    "#5C4EE5",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
  ];
  const pieData =
    data?.categoryStats?.map((stat: any, index: number) => ({
      name: stat._id,
      value: stat.value,
      color: colors[index % colors.length],
    })) || [];

  const barData =
    data?.barChartData?.length > 0
      ? data.barChartData
      : [{ name: "Jan", income: 0, expense: 0 }];

  const recentTransactions = data?.recentTransactions || [];

  return (
    <Layout>
      <div className="w-full space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-500 dark:text-slate-400 mt-1">
              Here's your financial overview
            </p>
          </div>
        </div>

        <SummaryCards income={income} expense={expense} balance={balance} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <MonthlyBarChart data={barData} />
          <CategoryPieChart data={pieData} />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
          <div className="p-6 flex justify-between items-center border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              Recent Transactions
            </h3>
            <Link
              to="/transactions"
              className="text-sm font-semibold text-[#5C4EE5] hover:text-[#4338CA] flex items-center gap-1"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            {recentTransactions.length === 0 ? (
              <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                No transactions yet. Go to the Transactions page to add one.
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-medium border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Amount</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {recentTransactions.map((tx: any) => (
                    <tr
                      key={tx._id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                        <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium">
                          {tx.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                        {new Date(tx.date).toLocaleDateString()}
                      </td>
                      <td
                        className={`px-6 py-4 text-right font-bold ${tx.type === "income" ? "text-green-600 dark:text-green-400" : "text-slate-800 dark:text-slate-200"}`}
                      >
                        {tx.type === "income" ? "+" : "-"} PKR{" "}
                        {tx.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                          <MoreHorizontal size={18} className="mx-auto" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

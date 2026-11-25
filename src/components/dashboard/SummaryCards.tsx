import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";

interface SummaryProps {
  income: number;
  expense: number;
  balance: number;
}

export default function SummaryCards({
  income,
  expense,
  balance,
}: SummaryProps) {
  const { currency } = useCurrency();
  const summaryData = [
    {
      title: "Total Income",
      amount: income,
      icon: <ArrowUpRight />,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-500/10",
    },
    {
      title: "Total Expenses",
      amount: expense,
      icon: <ArrowDownRight />,
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-500/10",
    },
    {
      title: "Balance",
      amount: balance,
      icon: <Wallet />,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {summaryData.map((item, index) => (
        <div
          key={index}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center gap-4 transition-colors"
        >
          <div className={`p-4 rounded-xl ${item.bg} ${item.color}`}>
            {item.icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-slate-400">
              {item.title}
            </p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1 flex items-center gap-1 whitespace-nowrap">
              <span className="text-lg text-gray-500 font-medium">
                {currency}
              </span>{" "}
              {item.amount.toLocaleString()}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}

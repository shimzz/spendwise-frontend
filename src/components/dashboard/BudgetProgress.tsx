import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Wallet } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext"; // <--- Import karein

interface BudgetProgressProps {
  budgetAmount: number;
  totalExpense: number;
  totalIncome?: number;
}

export default function BudgetProgress({
  budgetAmount,
  totalExpense,
  totalIncome = 0,
}: BudgetProgressProps) {
  const { currency } = useCurrency(); // <--- Hook use karein

  const remaining = budgetAmount - totalExpense;
  const progressPercentage =
    budgetAmount > 0 ? Math.min((totalExpense / budgetAmount) * 100, 100) : 0;
  const isOverBudget = totalExpense > budgetAmount && budgetAmount > 0;

  let barColor = "bg-gradient-to-r from-emerald-400 to-emerald-500";
  if (progressPercentage > 80 && progressPercentage <= 100)
    barColor = "bg-gradient-to-r from-amber-400 to-amber-500";
  if (isOverBudget || progressPercentage >= 100)
    barColor = "bg-gradient-to-r from-rose-500 to-red-600";

  if (budgetAmount === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl dark:shadow-none h-full flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 min-h-[300px] transition-colors">
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-4">
          <AlertTriangle
            className="text-slate-400 dark:text-slate-500"
            size={32}
          />
        </div>
        <p className="font-medium text-center">
          No budget set for this month.
          <br />
          Set one to start tracking!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl dark:shadow-none h-full flex flex-col justify-center min-h-[300px] transition-colors">
      <div className="flex justify-between items-start mb-8">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mt-1">
          Budget Progress
        </h2>
        {/* Dynamic Currency */}
        <div className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-100 dark:border-emerald-500/20">
          <Wallet size={16} />
          Income: {currency} {totalIncome.toLocaleString()}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1 font-medium">
              Spent
            </p>
            {/* Dynamic Currency */}
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {currency} {totalExpense.toLocaleString()}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1 font-medium">
              Budget
            </p>
            {/* Dynamic Currency */}
            <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300">
              {currency} {budgetAmount.toLocaleString()}
            </h3>
          </div>
        </div>

        <div>
          <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={`h-full rounded-full ${barColor}`}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <p
              className={`text-sm font-bold ${isOverBudget ? "text-rose-500" : "text-slate-500 dark:text-slate-400"}`}
            >
              {progressPercentage.toFixed(1)}% Used
            </p>
            {isOverBudget && (
              <span className="text-xs text-rose-500 font-bold bg-rose-50 dark:bg-rose-500/10 px-2 py-1 rounded-md">
                Over Budget!
              </span>
            )}
          </div>
        </div>

        <div
          className={`p-4 rounded-2xl flex items-center justify-between border ${isOverBudget ? "bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20 text-rose-700 dark:text-rose-400" : "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400"}`}
        >
          <span className="font-semibold flex items-center gap-2">
            {isOverBudget ? (
              <AlertTriangle size={18} />
            ) : (
              <CheckCircle2 size={18} />
            )}{" "}
            {isOverBudget ? "Over Budget By" : "Remaining"}
          </span>
          {/* Dynamic Currency */}
          <span className="font-extrabold text-lg">
            {currency} {Math.abs(remaining).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

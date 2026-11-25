import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Target, Loader2, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout/Layout";
import BudgetProgress from "@/components/dashboard/BudgetProgress";
import { getBudget, setBudget } from "@/services/budgetService";
import { fetchTransactions } from "@/services/transactionService";
import { toast } from "sonner";
import { useCurrency } from "@/context/CurrencyContext"; // <--- Import karein

export default function Budget() {
  const { currency } = useCurrency(); // <--- Hook use karein

  const [budgetAmount, setBudgetAmount] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form States
  const [inputAmount, setInputAmount] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  // End Date: Aaj se 1 mahina aage (Default)
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const [endDate, setEndDate] = useState(nextMonth.toISOString().split("T")[0]);

  // Active Budget Info
  const [activePeriod, setActivePeriod] = useState<{
    start: string;
    end: string;
  } | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const budgetData = await getBudget();

      if (budgetData.amount > 0) {
        setBudgetAmount(budgetData.amount);
        setActivePeriod({
          start: new Date(budgetData.startDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          end: new Date(budgetData.endDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        });
      } else {
        setBudgetAmount(0);
        setActivePeriod(null);
      }

      const transactions = await fetchTransactions();

      let monthlyExpense = 0;
      let monthlyIncome = 0;

      if (budgetData.amount > 0) {
        const start = new Date(budgetData.startDate).getTime();
        const end = new Date(budgetData.endDate).getTime();

        transactions.forEach((tx: any) => {
          const txDate = new Date(tx.date).getTime();
          if (txDate >= start && txDate <= end) {
            if (tx.type === "expense") monthlyExpense += tx.amount;
            if (tx.type === "income") monthlyIncome += tx.amount;
          }
        });
      }

      setTotalExpense(monthlyExpense);
      setTotalIncome(monthlyIncome);
    } catch (error) {
      toast.error("Failed to load budget data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSetBudget = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputAmount || !startDate || !endDate) return;

    if (new Date(startDate) > new Date(endDate)) {
      toast.error("End date must be after start date!");
      return;
    }

    try {
      setSaving(true);
      await setBudget(Number(inputAmount), startDate, endDate);
      toast.success("Budget saved successfully!");
      fetchData(); // Reload data
    } catch (error) {
      toast.error("Failed to update budget");
    } finally {
      setSaving(false);
    }
  };

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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full space-y-8"
      >
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 transition-colors">
          <h1 className="text-3xl font-extrabold text-[#0B1120] dark:text-white transition-colors">
            Custom Budget
          </h1>
          <div className="flex items-center gap-2 mt-2 text-slate-500 dark:text-slate-400 font-medium">
            <CalendarDays size={18} />
            {activePeriod ? (
              <span>
                Active Period:{" "}
                <strong className="text-[#5C4EE5] dark:text-indigo-400">
                  {activePeriod.start} - {activePeriod.end}
                </strong>
              </span>
            ) : (
              <span>No active budget. Set a date range below.</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none h-fit transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-indigo-50 dark:bg-indigo-500/10 p-3 rounded-xl text-[#5C4EE5] dark:text-indigo-400 transition-colors">
                <Target size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white transition-colors">
                {budgetAmount > 0 ? "Update Budget" : "Set Budget"}
              </h2>
            </div>

            <form onSubmit={handleSetBudget} className="space-y-5">
              <div className="space-y-2">
                {/* Dynamic Currency Label */}
                <Label className="text-slate-700 dark:text-slate-300 font-semibold">
                  Budget Amount ({currency})
                </Label>
                <Input
                  type="number"
                  min="1"
                  placeholder="e.g. 50000"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                  required
                  className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-700 dark:text-slate-300 font-semibold">
                    Start Date
                  </Label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 dark:text-slate-300 font-semibold">
                    End Date
                  </Label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 transition-colors"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={saving}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#5C4EE5] to-[#8B5CF6] hover:from-[#4b3ec4] hover:to-[#7c4df3] text-white text-md font-bold shadow-lg shadow-indigo-500/30 transition-all"
              >
                {saving ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  "Save Budget"
                )}
              </Button>
            </form>
          </div>

          <BudgetProgress
            budgetAmount={budgetAmount}
            totalExpense={totalExpense}
            totalIncome={totalIncome}
          />
        </div>
      </motion.div>
    </Layout>
  );
}

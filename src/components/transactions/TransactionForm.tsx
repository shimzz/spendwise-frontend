import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Loader2, X, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  addTransaction,
  updateTransaction,
} from "@/services/transactionService";
import type { Transaction } from "@/types";

interface FormProps {
  onTransactionAdded: () => void;
  editData?: Transaction | null;
  cancelEdit?: () => void;
}

export default function TransactionForm({
  onTransactionAdded,
  editData,
  cancelEdit,
}: FormProps) {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [submitting, setSubmitting] = useState(false);

  // Jab edit mode ho toh data load karein
  useEffect(() => {
    if (editData) {
      setType(editData.type);
      setAmount(editData.amount.toString());
      setCategory(editData.category);
      setDescription(editData.description || "");
      setDate(new Date(editData.date).toISOString().split("T")[0]);
    }
  }, [editData]);

  // Jab Type change karein (Income se Expense ya vice versa),
  // toh Category ko default par reset karein
  const handleTypeChange = (newType: "income" | "expense") => {
    setType(newType);
    if (newType === "income") {
      setCategory("Salary"); // Income ki default category
    } else {
      setCategory("Food"); // Expense ki default category
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    try {
      setSubmitting(true);
      const payload = {
        type,
        amount: Number(amount),
        category,
        description,
        date,
      };
      if (editData) {
        await updateTransaction(editData._id, payload);
      } else {
        await addTransaction(payload);
      }
      setAmount("");
      setDescription("");
      onTransactionAdded();
      if (editData && cancelEdit) cancelEdit();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="lg:col-span-1 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none h-fit relative overflow-hidden transition-colors"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 dark:bg-indigo-500/10 rounded-bl-full -z-10 opacity-50"></div>

      <div className="flex justify-between items-center mb-6 relative z-10">
        <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">
          {editData ? "Edit Transaction" : "New Transaction"}
        </h2>
        {editData && (
          <button
            onClick={cancelEdit}
            className="text-slate-400 hover:text-red-500 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        {/* Type Toggle */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => handleTypeChange("income")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${type === "income" ? "bg-white dark:bg-slate-900 text-green-600 shadow-md transform scale-100" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 scale-95"}`}
          >
            <ArrowUpRight size={18} /> Income
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange("expense")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${type === "expense" ? "bg-white dark:bg-slate-900 text-red-500 shadow-md transform scale-100" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 scale-95"}`}
          >
            <ArrowDownRight size={18} /> Expense
          </button>
        </div>

        <div className="space-y-1.5">
          <Label className="text-slate-600 dark:text-slate-300 font-semibold">
            Amount (PKR)
          </Label>
          <Input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-slate-600 dark:text-slate-300 font-semibold">
            Category
          </Label>
          <select
            className="w-full h-12 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#5C4EE5] focus:bg-white dark:focus:bg-slate-900 transition-colors"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {/* Agar Income select hai toh yeh options dikhein */}
            {type === "income" ? (
              <>
                <option value="Salary">💼 Salary</option>
                <option value="Freelance">💻 Freelance</option>
                <option value="Business">🏢 Business</option>
                <option value="Investment">📈 Investment</option>
                <option value="Gift">🎁 Gift</option>
                <option value="Other">📦 Other Income</option>
              </>
            ) : (
              /* Agar Expense select hai toh yeh options dikhein */
              <>
                <option value="Food">🍔 Food</option>
                <option value="Rent">🏠 Rent</option>
                <option value="Shopping">🛍️ Shopping</option>
                <option value="Transport">🚗 Transport</option>
                <option value="Bills">🧾 Bills</option>
                <option value="Other">📦 Other Expense</option>
              </>
            )}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-slate-600 dark:text-slate-300 font-semibold">
            Date
          </Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-slate-600 dark:text-slate-300 font-semibold">
            Description{" "}
            <span className="text-slate-400 dark:text-slate-500 font-normal">
              (Optional)
            </span>
          </Label>
          <Input
            type="text"
            placeholder="e.g. Monthly salary"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 transition-colors"
          />
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className={`w-full h-12 rounded-xl text-white font-bold text-md shadow-lg transition-transform hover:-translate-y-0.5 ${editData ? "bg-amber-500 hover:bg-amber-600 shadow-amber-500/30" : "bg-gradient-to-r from-[#5C4EE5] to-[#8B5CF6] hover:from-[#4b3ec4] hover:to-[#7c4df3] shadow-indigo-500/30"}`}
        >
          {submitting ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : editData ? (
            "Update Record"
          ) : (
            "Save Transaction"
          )}
        </Button>
      </form>
    </motion.div>
  );
}

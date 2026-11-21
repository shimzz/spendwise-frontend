import { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Trash2,
  Loader2,
  Pencil,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import type { Transaction } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface TableProps {
  transactions: Transaction[];
  loading: boolean;
  onDelete: (id: string) => void;
  onEdit: (tx: Transaction) => void;
}

export default function TransactionTable({
  transactions,
  loading,
  onDelete,
  onEdit,
}: TableProps) {
  // State for viewing full description
  const [selectedDescription, setSelectedDescription] = useState<string | null>(
    null,
  );

  const getCategoryStyle = (cat: string) => {
    switch (cat) {
      case "Salary":
        return "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30";
      case "Food":
        return "bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-500/30";
      case "Rent":
        return "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/30";
      case "Shopping":
        return "bg-pink-100 dark:bg-pink-500/20 text-pink-700 dark:text-pink-400 border-pink-200 dark:border-pink-500/30";
      case "Transport":
        return "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30";
      case "Bills":
        return "bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/30";
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700";
    }
  };

  return (
    <>
      <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl dark:shadow-none overflow-hidden transition-colors">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-gradient-to-r from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/50">
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">
            Recent History
          </h2>
          <span className="text-sm font-bold text-[#5C4EE5] dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full">
            {transactions.length} Records
          </span>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center p-10">
              <Loader2 className="animate-spin text-[#5C4EE5] h-8 w-8" />
            </div>
          ) : transactions.length === 0 ? (
            <div className="p-10 text-center text-slate-500 dark:text-slate-400 font-medium">
              No transactions found. Add your first one!
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50 dark:bg-slate-800/30 text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-bold">Type</th>
                  <th className="px-6 py-4 font-bold">Category</th>
                  <th className="px-6 py-4 font-bold">Description</th>
                  <th className="px-6 py-4 font-bold">Date</th>
                  <th className="px-6 py-4 font-bold text-right">Amount</th>
                  <th className="px-6 py-4 font-bold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {transactions.map((tx) => (
                  <motion.tr
                    key={tx._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-6 py-4">
                      {tx.type === "income" ? (
                        <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-500/10 w-fit px-2.5 py-1 rounded-lg">
                          <ArrowUpRight size={16} /> Income
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-500/10 w-fit px-2.5 py-1 rounded-lg">
                          <ArrowDownRight size={16} /> Expense
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${getCategoryStyle(tx.category)}`}
                      >
                        {tx.category}
                      </span>
                    </td>

                    {/* Description Column */}
                    <td className="px-6 py-4 max-w-[150px] md:max-w-[200px]">
                      {tx.description ? (
                        <div
                          onClick={() =>
                            setSelectedDescription(tx.description || "")
                          }
                          className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 cursor-pointer hover:text-[#5C4EE5] transition-colors group"
                          title="Click to read full description"
                        >
                          <FileText
                            size={14}
                            className="shrink-0 opacity-50 group-hover:opacity-100"
                          />
                          {/* Truncate text with ellipsis */}
                          <span className="truncate block">
                            {tx.description}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-300 dark:text-slate-600 italic">
                          No description
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-medium">
                      {new Date(tx.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td
                      className={`px-6 py-4 text-right font-extrabold text-lg ${tx.type === "income" ? "text-emerald-500 dark:text-emerald-400" : "text-slate-800 dark:text-slate-200"}`}
                    >
                      {tx.type === "income" ? "+" : "-"} PKR{" "}
                      {tx.amount.toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onEdit(tx)}
                          className="p-2 bg-blue-50 dark:bg-blue-500/10 text-blue-500 dark:text-blue-400 hover:bg-blue-500 dark:hover:bg-blue-600 hover:text-white rounded-lg transition-all hover:scale-110"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => onDelete(tx._id)}
                          className="p-2 bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400 hover:bg-red-500 dark:hover:bg-red-600 hover:text-white rounded-lg transition-all hover:scale-110"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Description View Dialog (Modal) */}
      <Dialog
        open={!!selectedDescription}
        onOpenChange={(open) => !open && setSelectedDescription(null)}
      >
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="text-[#5C4EE5]" size={20} />
              Full Description
            </DialogTitle>
            <DialogDescription className="mt-4 text-slate-600 dark:text-slate-300 text-md leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
              {selectedDescription}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import TransactionForm from "@/components/transactions/TransactionForm";
import TransactionTable from "@/components/transactions/TransactionTable";
import TransactionFilters from "@/components/transactions/TransactionFilters";
import {
  fetchTransactions,
  deleteTransaction,
} from "@/services/transactionService";
import type { Transaction } from "@/types";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editData, setEditData] = useState<Transaction | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const data = await fetchTransactions();
      setTransactions(data);
    } catch (err) {
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      setIsDeleting(true);
      await deleteTransaction(deleteId);
      toast.success("Transaction deleted successfully");
      loadTransactions();
    } catch (err) {
      toast.error("Failed to delete transaction");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const filteredTransactions = transactions.filter((tx) => {
    const matchesType = filterType === "all" || tx.type === filterType;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      tx.category.toLowerCase().includes(searchLower) ||
      (tx.description && tx.description.toLowerCase().includes(searchLower));
    return matchesType && matchesSearch;
  });

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full space-y-8"
      >
        <div className="flex justify-between items-end border-b border-slate-200 dark:border-slate-800 pb-6 transition-colors">
          <div>
            <h1 className="text-3xl font-extrabold text-[#0B1120] dark:text-white transition-colors">
              Transactions
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium transition-colors">
              Manage your income and expenses in one place.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <TransactionForm
            onTransactionAdded={() => {
              toast.success(
                editData ? "Transaction updated" : "Transaction added",
              );
              loadTransactions();
            }}
            editData={editData}
            cancelEdit={() => setEditData(null)}
          />

          <div className="lg:col-span-2 space-y-4">
            <TransactionFilters
              filterType={filterType}
              setFilterType={setFilterType}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            <TransactionTable
              transactions={filteredTransactions}
              loading={loading}
              onDelete={(id) => setDeleteId(id)}
              onEdit={(tx) => setEditData(tx)}
            />
          </div>
        </div>
      </motion.div>

      {/* Glassmorphism Dialog */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        {/* Yahan glassmorphism classes lagayi hain: bg-white/40, backdrop-blur-xl, border-white/50 */}
        <AlertDialogContent className="sm:max-w-[425px] bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-2xl rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-700 dark:text-slate-300 font-medium text-md mt-2">
              This action cannot be undone. This will permanently delete this
              transaction from your record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel
              className="border-slate-300/50 dark:border-slate-600/50 text-slate-700 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-xl font-bold"
              disabled={isDeleting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }}
              disabled={isDeleting}
              className="bg-rose-500/90 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/30 rounded-xl font-bold backdrop-blur-sm"
            >
              {isDeleting ? "Deleting..." : "Yes, Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}

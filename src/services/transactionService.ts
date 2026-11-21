import api from "@/lib/api";
import type { Transaction } from "@/types";

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get("/transactions");
  return response.data;
};

export const addTransaction = async (data: Partial<Transaction>) => {
  const response = await api.post("/transactions", data);
  return response.data;
};

export const deleteTransaction = async (id: string) => {
  const response = await api.delete(`/transactions/${id}`);
  return response.data;
};
export const updateTransaction = async (
  id: string,
  data: Partial<Transaction>,
) => {
  const response = await api.put(`/transactions/${id}`, data);
  return response.data;
};

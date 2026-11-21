export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  token?: string;
}

export interface Transaction {
  _id: string;
  user: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description?: string;
  date: string;
  createdAt?: string;
}

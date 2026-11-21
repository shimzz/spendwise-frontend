import api from "@/lib/api";

export const getBudget = async () => {
  // Ab month ki zaroorat nahi, backend aaj ki date se active budget khud dhoond lega
  const response = await api.get(`/budget`);
  return response.data;
};

export const setBudget = async (
  amount: number,
  startDate: string,
  endDate: string,
) => {
  const response = await api.post("/budget", { amount, startDate, endDate });
  return response.data;
};

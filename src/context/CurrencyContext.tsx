import { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api";

interface CurrencyContextType {
  currency: string;
  setCurrency: (c: string) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined,
);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  // Default "PKR" rakhein, ya jo localStorage mein save ho
  const [currency, setCurrencyState] = useState<string>(() => {
    return localStorage.getItem("app_currency") || "PKR";
  });

  // App load hote hi Admin ki Global Setting fetch karein
  useEffect(() => {
    const fetchGlobalCurrency = async () => {
      try {
        const res = await api.get("/settings");
        // Agar user ne khud se koi currency select nahi ki, toh global lagayein
        if (!localStorage.getItem("app_currency") && res.data.currency) {
          setCurrencyState(res.data.currency);
        }
      } catch (error) {
        console.error("Failed to fetch currency");
      }
    };
    fetchGlobalCurrency();
  }, []);

  const setCurrency = (c: string) => {
    setCurrencyState(c);
    localStorage.setItem("app_currency", c);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context)
    throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
};

import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./app-routes/index";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "sonner"; // <--- Import karein
import { CurrencyProvider } from "./context/CurrencyContext";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CurrencyProvider>
          <AuthProvider>
            <AppRoutes />
            <Toaster position="top-right" richColors />{" "}
          </AuthProvider>
        </CurrencyProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

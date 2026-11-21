import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./app-routes/index";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "sonner"; // <--- Import karein

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
          <Toaster position="top-right" richColors />{" "}
          {/* <--- Yahan add karein */}
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

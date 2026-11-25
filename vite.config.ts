import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // YEH NAYA HISSA ADD KAREIN
  server: {
    host: true,
    allowedHosts: true, // Kisi bhi public link se access ki ijazat dega
  },
});

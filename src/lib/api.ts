import axios from "axios";

// Backend ka base URL set kiya hai
const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

// Har request ke sath token bhejne ke liye Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;

import axios from "axios";

// 🌐 Use localhost for dev, Render URL for production
const API_BASE_URL = import.meta.env.DEV
  ? "http://localhost:5000/api"
  : `${import.meta.env.VITE_API_URL}/api`;

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token automatically
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle auth errors globally
instance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/profile";
    }
    return Promise.reject(error);
  }
);

export default instance;

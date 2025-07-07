import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "/api", // Only /api not full http://localhost:5000/api
  headers: {
    "Content-Type": "application/json",
  },
  
});

// ✅ Request interceptor to attach token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// ✅ Response interceptor to catch 401/403 globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401 || status === 403) {
        console.warn("Unauthorized or forbidden. Logging out user.");
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login page
      }
    }
    return Promise.reject(error);
  }
);

export default instance;

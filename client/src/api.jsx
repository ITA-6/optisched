import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

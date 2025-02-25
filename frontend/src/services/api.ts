import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API_URL = "https://task-management-ts-fjri.onrender.com";


const api = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
});

// Automatically attach token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

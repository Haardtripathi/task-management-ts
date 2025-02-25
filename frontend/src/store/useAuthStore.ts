import { create } from "zustand";
import api from "../services/api";

interface AuthState {
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem("token"),

    login: async (email, password) => {
        const { data } = await api.post("/auth/login", { email, password });
        localStorage.setItem("token", data.token);
        set({ token: data.token });
    },

    register: async (name, email, password) => {
        await api.post("/auth/register", { name, email, password });
    },

    logout: () => {
        localStorage.removeItem("token");
        set({ token: null });
    },

    isAuthenticated: () => !!localStorage.getItem("token"),
}));




import { useEffect } from "react";
import { create } from "zustand";
import api from "../services/api";
import moment from "moment-timezone";

export interface Task {
    _id: string;
    title: string;
    description: string;
    status: "Done" | "To Do" | "In Progress" | "Timeout";
    deadline: string;
    createdAt: string;
}

interface TaskState {
    tasks: Task[];
    fetchTasks: () => Promise<void>;
    addTask: (task: Partial<Task>) => Promise<void>;
    updateTask: (id: string, updatedTask: Partial<Task>) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [],

    fetchTasks: async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const { data } = await api.get("/tasks", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const now = moment().tz("Asia/Kolkata");

            // 🔹 Move expired tasks to "Timeout"
            const updatedTasks = data.map((task: Task) => {
                const deadline = moment(task.deadline).tz("Asia/Kolkata");
                if (task.status !== "Timeout" && now.isAfter(deadline)) {
                    return { ...task, status: "Timeout" };
                }
                return task;
            });

            set({ tasks: updatedTasks });
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    },

    addTask: async (task) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            await api.post("/tasks", task, {
                headers: { Authorization: `Bearer ${token}` },
            });

            await useTaskStore.getState().fetchTasks(); // Refresh tasks after adding
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    },

    updateTask: async (id, updatedTask) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const formattedTask: Partial<Task> = {
                ...updatedTask,
                status: updatedTask.status as "Done" | "To Do" | "In Progress" | "Timeout",
            };

            await api.put(`/tasks/${id}`, formattedTask, {
                headers: { Authorization: `Bearer ${token}` },
            });

            await useTaskStore.getState().fetchTasks(); // Refresh tasks after updating
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    },

    deleteTask: async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            await api.delete(`/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            await useTaskStore.getState().fetchTasks(); // Refresh tasks after deleting
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    },
}));

export const useAutoFetchTasks = () => {
    const fetchTasks = useTaskStore((state) => state.fetchTasks);

    useEffect(() => {
        fetchTasks();
        const interval = setInterval(fetchTasks, 60000); // Auto-refresh tasks every 60s

        return () => clearInterval(interval);
    }, [fetchTasks]);
};

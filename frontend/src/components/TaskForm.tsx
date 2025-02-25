
import { useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import toast from "react-hot-toast";
import moment from "moment-timezone";
import { Calendar, Clock, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

const TaskForm = () => {
    const { addTask } = useTaskStore();
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState(moment().tz("Asia/Kolkata").format("YYYY-MM-DDTHH:mm"));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error("Title is required!");
            return;
        }
        if (!deadline) {
            toast.error("Please select a deadline!");
            return;
        }

        const formattedDeadline = moment(deadline).tz("Asia/Kolkata").format();

        await addTask({ title, description, deadline: formattedDeadline });
        toast.success("Task added successfully!");

        setTitle("");
        setDescription("");
        setDeadline(moment().tz("Asia/Kolkata").format("YYYY-MM-DDTHH:mm"));
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-indigo-500 p-4 rounded-full shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
            >
                <Plus className="w-6 h-6" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-[#1a1a3a] w-full max-w-md rounded-2xl shadow-2xl border border-purple-500/20"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-purple-500/20">
                                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                                    Create New Task
                                </h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <input
                                        className="w-full p-3 bg-[#0B0B1E]/50 rounded-xl border border-purple-500/20 focus:border-purple-500/50 transition-colors outline-none placeholder:text-gray-500"
                                        placeholder="Task Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <textarea
                                        className="w-full p-3 bg-[#0B0B1E]/50 rounded-xl border border-purple-500/20 focus:border-purple-500/50 transition-colors outline-none placeholder:text-gray-500 min-h-[100px]"
                                        placeholder="Task Description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        Set Deadline (IST)
                                    </label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
                                        <input
                                            type="datetime-local"
                                            className="w-full p-3 pl-10 bg-[#0B0B1E]/50 rounded-xl border border-purple-500/20 focus:border-purple-500/50 transition-colors outline-none"
                                            value={deadline}
                                            onChange={(e) => setDeadline(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transform hover:scale-[1.02] transition-all duration-300 font-medium"
                                >
                                    Create Task
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default TaskForm;

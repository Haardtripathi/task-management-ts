
"use client"

import { useState } from "react"
import { useTaskStore } from "../store/useTaskStore"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import { X, Save, AlertTriangle } from "lucide-react"

interface Props {
    taskId: string
    currentTitle: string
    currentDescription: string
    currentStatus: "Done" | "To Do" | "In Progress" | "Timeout"
    onClose: () => void
}

const EditTaskModal = ({ taskId, currentTitle, currentDescription, currentStatus, onClose }: Props) => {
    const { updateTask } = useTaskStore()
    const [title, setTitle] = useState(currentTitle)
    const [description, setDescription] = useState(currentDescription)
    const [status, setStatus] = useState<"Done" | "To Do" | "In Progress" | "Timeout">(currentStatus)
    const [isEditable] = useState(currentStatus !== "Done" && currentStatus !== "Timeout")

    const handleUpdate = async () => {
        if (!isEditable) return
        if (!title.trim()) {
            toast.error("Title cannot be empty!")
            return
        }

        await updateTask(taskId, { title, description, status })
        toast.success("Task updated successfully!")
        onClose()
    }

    return (
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
                        Edit Task
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {!isEditable && (
                    <div className="px-6 py-3 bg-yellow-500/10 border-y border-yellow-500/20 flex items-center gap-2 text-yellow-400 text-sm">
                        <AlertTriangle className="w-4 h-4" />
                        This task cannot be edited as it is completed or expired
                    </div>
                )}

                <div className="p-6 space-y-4">
                    <input
                        className={`w-full p-3 bg-[#0B0B1E]/50 rounded-xl border border-purple-500/20 focus:border-purple-500/50 transition-colors outline-none ${!isEditable ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={!isEditable}
                    />

                    <textarea
                        className={`w-full p-3 bg-[#0B0B1E]/50 rounded-xl border border-purple-500/20 focus:border-purple-500/50 transition-colors outline-none min-h-[100px] ${!isEditable ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={!isEditable}
                    />

                    <select
                        className={`w-full p-3 bg-[#0B0B1E]/50 rounded-xl border border-purple-500/20 focus:border-purple-500/50 transition-colors outline-none ${!isEditable ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        value={status}
                        onChange={(e) => setStatus(e.target.value as "Done" | "To Do" | "In Progress" | "Timeout")}
                        disabled={!isEditable}
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>

                    <div className="flex gap-3">
                        <button
                            onClick={handleUpdate}
                            disabled={!isEditable}
                            className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 ${isEditable
                                ? "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transform hover:scale-[1.02] transition-all duration-300"
                                : "bg-gray-600 cursor-not-allowed"
                                }`}
                        >
                            <Save className="w-4 h-4" />
                            Save Changes
                        </button>
                        <button
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default EditTaskModal




import { useEffect, useState } from "react";
import { Task, useTaskStore } from "../store/useTaskStore";
import { Trash2, Edit2, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import moment from "moment-timezone";
import EditTaskModal from "./EditTaskModal";
import { motion } from "framer-motion";

interface Props {
    task: Task;
}

const TaskItem = ({ task }: Props) => {
    const { deleteTask } = useTaskStore();
    const [timeLeft, setTimeLeft] = useState("");
    const [statusColor, setStatusColor] = useState("text-purple-400");
    const [isEditing, setIsEditing] = useState(false);
    const [isEditable, setIsEditable] = useState(true);

    useEffect(() => {
        const updateCountdown = () => {
            const now = moment().tz("Asia/Kolkata");
            const deadline = moment(task.deadline).tz("Asia/Kolkata");

            if (task.status === "Done") {
                setTimeLeft("Completed");
                setStatusColor("text-green-400");
                setIsEditable(false);
            } else if (now.isAfter(deadline)) {
                setTimeLeft("Expired");
                setStatusColor("text-red-400");
                setIsEditable(false);
            } else {
                setTimeLeft(deadline.fromNow());
                if (task.status === "In Progress") {
                    setStatusColor("text-yellow-400");
                } else if (task.status === "To Do") {
                    setStatusColor("text-purple-400");
                }
                setIsEditable(true);
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 60000);
        return () => clearInterval(interval);
    }, [task.status, task.deadline]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#1a1a3a] rounded-xl border border-purple-500/20 shadow-lg overflow-hidden"
        >
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{task.title}</h3>
                        <p className="text-gray-400 text-sm">{task.description}</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            className={`p-2 rounded-lg transition-colors ${isEditable
                                ? "hover:bg-purple-500/10 text-purple-400"
                                : "text-gray-600 cursor-not-allowed"
                                }`}
                            onClick={() => isEditable && setIsEditing(true)}
                            disabled={!isEditable}
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
                            onClick={() => deleteTask(task._id)}
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-400">
                        <Clock className="w-4 h-4" />
                        {moment(task.deadline).tz("Asia/Kolkata").format("hh:mm A, DD MMM")}
                    </div>
                    <div className={`flex items-center gap-1 ${statusColor}`}>
                        {task.status === "Done" ? (
                            <CheckCircle className="w-4 h-4" />
                        ) : task.status === "Timeout" ? (
                            <AlertCircle className="w-4 h-4" />
                        ) : (
                            <Clock className="w-4 h-4" />
                        )}
                        {timeLeft}
                    </div>
                </div>
            </div>

            {isEditing && (
                <EditTaskModal
                    taskId={task._id}
                    currentTitle={task.title}
                    currentDescription={task.description}
                    currentStatus={task.status}
                    onClose={() => setIsEditing(false)}
                />
            )}
        </motion.div>
    );
};

export default TaskItem;

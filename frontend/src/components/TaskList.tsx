

"use client"

import TaskItem from "./TaskItem"
import type { Task } from "../store/useTaskStore"
import { motion, AnimatePresence } from "framer-motion"
import { FileQuestion } from "lucide-react"

interface Props {
    tasks: Task[]
}

const TaskList = ({ tasks }: Props) => {
    return (
        <div className="w-full max-w-4xl mx-auto space-y-4">
            <AnimatePresence>
                {tasks.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex flex-col items-center justify-center p-8 text-gray-400"
                    >
                        <FileQuestion className="w-12 h-12 mb-4" />
                        <p className="text-lg">No tasks found</p>
                        <p className="text-sm">Create a new task to get started</p>
                    </motion.div>
                ) : (
                    tasks.map((task) => <TaskItem key={task._id} task={task} />)
                )}
            </AnimatePresence>
        </div>
    )
}

export default TaskList


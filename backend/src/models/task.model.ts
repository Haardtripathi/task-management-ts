

import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["To Do", "In Progress", "Done", "Timeout"], default: "To Do" },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    deadline: { type: Date, required: true }, // Stores deadline in IST
});

export const Task = mongoose.model("Task", taskSchema);

import express from "express";
import cors from "cors";

import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import twitchRoutes from "./routes/twitch.routes";


dotenv.config();
const app = express();

// Middleware
app.use(cors({
    origin: [
        "https://task-manager-pve9.onrender.com"
    ]
}));
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api", twitchRoutes);



// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    await connectDB();
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

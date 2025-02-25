
import { Router } from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/task.controller";
import { authMiddleware } from "../middelware/auth.middleware"; // Ensure correct import

const router = Router();

router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, createTask);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

export default router;

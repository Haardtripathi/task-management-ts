import { Request, Response } from "express";
import { Task } from "../models/task.model";
import axios from "axios";
import moment from "moment-timezone";

import jwt from "jsonwebtoken";

export const getTasks = async (req: Request, res: Response): Promise<void | any> => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Get token from header
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!); // Decode the JWT token
        const userId = decoded.userId; // Extract userId from the token

        const tasks = await Task.find({ userId }); // Fetch tasks belonging to this user
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks" });
    }
};




export const createTask = async (req: Request, res: Response): Promise<void | any> => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const userId = decoded.userId; // Extract user ID

        const { title, description, deadline } = req.body;

        if (!title || !deadline) {
            return res.status(400).json({ message: "Title and deadline are required" });
        }

        const newTask = new Task({ title, description, deadline, userId }); // Save user ID with task
        await newTask.save();

        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Error creating task" });
    }
};



export const updateTask = async (req: Request, res: Response): Promise<void | any> => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task Deleted" });
};





export const fetchStreamingData = async (req: Request, res: Response): Promise<void> => {
    try {
        const { data } = await axios.get("https://api.twitch.tv/helix/streams", {
            headers: { "Client-ID": process.env.TWITCH_CLIENT_ID }
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching streaming data" });
    }
};

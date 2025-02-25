// import { Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model"
// export const register = async (req: Request, res: Response) => {
//     try {
//         const { name, email, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await User.create({ name, email, password: hashedPassword });
//         res.status(201).json(user);
//     } catch (error) {
//         res.status(500).json({ message: "Server Error" });
//     }
// };

// export const login = async (req: Request, res: Response) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.status(401).json({ message: "Invalid Credentials" });
//         }
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
//         res.json({ token });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error" });
//     }
// };


import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ message: "Invalid Credentials" });
            return;
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

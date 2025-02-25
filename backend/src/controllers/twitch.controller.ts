import axios from "axios";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_ACCESS_TOKEN = process.env.TWITCH_ACCESS_TOKEN; // Get token from Twitch API

export const fetchTwitchStreams = async (req: Request, res: Response) => {
    try {
        const { data } = await axios.get("https://api.twitch.tv/helix/streams", {
            headers: {
                "Client-ID": TWITCH_CLIENT_ID!,
                Authorization: `Bearer ${TWITCH_ACCESS_TOKEN!}`,
            },
        });

        res.json(data.data);
    } catch (error) {
        console.error("Error fetching Twitch streams:", error);
        res.status(500).json({ message: "Error fetching Twitch streams" });
    }
};

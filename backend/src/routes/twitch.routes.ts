import express from "express";
import { fetchTwitchStreams } from "../controllers/twitch.controller";

const router = express.Router();

router.get("/twitch", fetchTwitchStreams);

export default router;

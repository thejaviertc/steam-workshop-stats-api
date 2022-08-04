// Imports
import express from "express";
const router = express.Router();

// Controllers
import twitchController from "../controllers/TwitchController.js";

router.get("/", twitchController.getStreamer);

export default router;

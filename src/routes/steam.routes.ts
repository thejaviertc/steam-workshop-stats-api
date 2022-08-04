// Imports
import express from "express";
const router = express.Router();

// Controllers
import steamController from "../controllers/SteamController.js";

router.get("/", steamController.getSteamUser);

export default router;

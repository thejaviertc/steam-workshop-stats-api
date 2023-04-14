import { NextFunction, Request, Response } from "express";
import DiscordService from "../services/DiscordService.js";

/**
 * Logs every GET/POST of the website in my Discord Server
 * @param req
 * @param res
 * @param next
 */
export default function logMiddleware(req: Request, res: Response, next: NextFunction) {
	DiscordService.logRoute(req);
	next();
}

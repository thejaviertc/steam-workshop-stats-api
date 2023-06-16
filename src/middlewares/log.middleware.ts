import { NextFunction, Request, Response } from "express";
import DiscordService from "../services/DiscordService.js";

/**
 * Logs every GET/POST of the website in my Discord Server
 * @param req
 * @param res
 * @param next
 */
export default async function logMiddleware(req: Request, _res: Response, next: NextFunction) {
	await DiscordService.logRoute(req);
	next();
}

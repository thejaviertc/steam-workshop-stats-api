import { NextFunction, Request, Response } from "express";
import DiscordService from "../services/DiscordService.js";

class LogAccessMiddleware {
	/**
	 * Logs every access to the API
	 */
	public async execute(req: Request, _res: Response, next: NextFunction) {
		await DiscordService.logRoute(req);
		return next();
	}
}

export default new LogAccessMiddleware().execute;

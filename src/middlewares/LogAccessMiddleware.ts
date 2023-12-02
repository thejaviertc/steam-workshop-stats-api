import { NextFunction, Request, Response } from "express";
import DiscordService from "../services/DiscordService.js";
import IMiddleware from "./IMiddleware.js";

class LogAccessMiddleware implements IMiddleware {
	/**
	 * Logs every access to the API
	 */
	public execute(req: Request, _res: Response, next: NextFunction) {
		DiscordService.logRoute(req);
		next();
	}
}

export default new LogAccessMiddleware();

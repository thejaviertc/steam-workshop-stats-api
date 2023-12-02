import { NextFunction, Request, Response } from "express";
import DiscordService from "../services/DiscordService.js";
import CustomError from "../errors/CustomError.js";

class ErrorHandlerMiddleware {
	/**
	 * Sends the specific error message of a custom error
	 */
	public execute(error: Error, _req: Request, res: Response, _next: NextFunction) {
		if (error instanceof CustomError) {
			res.status(error.httpCode).send({ message: error.message });
		} else {
			if (process.env.NODE_ENV === "production") {
				DiscordService.logUnhandledError(error);
			} else {
				console.log(`Custom Error: ${error.message}`);
			}

			res.sendStatus(500);
		}
	}
}

export default new ErrorHandlerMiddleware().execute;

import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError.js";

class ErrorMiddleware {
	/**
	 * Sends the specific error message of a custom error
	 */
	public execute(error: Error, _req: Request, res: Response, _next: NextFunction) {
		if (error instanceof CustomError) {
			res.status(error.httpCode).send({ message: error.message });
		} else {
			res.sendStatus(404);
		}
	}
}

export default new ErrorMiddleware().execute;

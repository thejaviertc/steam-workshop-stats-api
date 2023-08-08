import { NextFunction, Request, Response } from "express";
import IMiddleware from "./IMiddleware.js";

class AuthMiddleware implements IMiddleware {
	/**
	 * Checks if the user is authenticated
	 */
	public execute(req: Request, res: Response, next: NextFunction) {
		if (req.isAuthenticated()) {
			return next();
		}

		res.status(403).send({ message: "You are not logged in!" });
	}
}

export default new AuthMiddleware().execute;

import { NextFunction, Request, Response } from "express";

interface IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): Promise<void> | void;
}

export default IMiddleware;

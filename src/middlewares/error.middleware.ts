import { Request, Response } from "express";

export default function errorMiddleware(_req: Request, res: Response) {
	res.status(404).send("Error 404");
}

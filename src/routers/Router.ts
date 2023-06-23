import express, { Router as ExpressRouter } from "express";

export default abstract class Router {
	public router: ExpressRouter;

	public constructor() {
		this.router = express.Router();

		this.loadRoutes();
	}

	/**
	 * Loads all the routes
	 */
	abstract loadRoutes(): void;
}

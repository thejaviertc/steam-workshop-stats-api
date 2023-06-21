import express, { Router } from "express";

export default abstract class BasicRouter {
	public router: Router;

	public constructor() {
		this.router = express.Router();

		this.loadRoutes();
	}

	/**
	 * Loads all the routes
	 */
	abstract loadRoutes(): void;
}

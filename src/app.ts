import cors from "cors";
import express, { Express } from "express";
import ErrorHandler from "./errors/ErrorHandler.js";
import IpsMiddleware from "./middlewares/IpsMiddleware.js";
import LogAccessMiddleware from "./middlewares/LogAccessMiddleware.js";
import SteamUserRouter from "./routers/SteamUserRouter.js";

class App {
	private readonly app: Express;

	public constructor() {
		this.app = express();

		this.setupConfig();
		this.loadMiddlewares();
		this.loadRouters();

		this.app.use(ErrorHandler);

		this.app.listen(process.env.PORT ?? 3000, () => {
			console.log("App running");
		});
	}

	/**
	 * Setups the config of the app
	 */
	private setupConfig() {
		this.app.use(express.urlencoded({ extended: false }));
		this.app.disable("x-powered-by");

		this.app.use(
			cors({
				origin: "https://thejaviertc.github.io",
			})
		);
	}

	/**
	 * Loads all the Middlewares
	 */
	private loadMiddlewares() {
		this.app.use(IpsMiddleware);
		this.app.use(LogAccessMiddleware);
	}

	/**
	 * Loads all the Routers
	 */
	private loadRouters() {
		this.app.use("/steam-user", SteamUserRouter);
	}
}

const _app = new App();

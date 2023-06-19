import cors from "cors";
import express, { Express } from "express";
import errorMiddleware from "./middlewares/error.middleware.js";
import IpsMiddleware from "./middlewares/ips.middleware.js";
import logMiddleware from "./middlewares/log.middleware.js";
import steamRouter from "./routers/SteamUserRouter.js";
import DiscordService from "./services/DiscordService.js";

class App {
	private readonly app: Express;

	public constructor() {
		this.app = express();
	}

	/**
	 * Entry point of the App
	 */
	public async start() {
		this.setupConfig();
		this.loadRouters();

		// TODO: Remove await if possible
		await this.loadMiddlewares();

		this.app.listen(process.env.PORT ?? 3000, () => {
			console.log("App running");
		});

		process.on("uncaughtException", (error: Error) => {
			// TODO: Move check to Logger
			if (process.env.NODE_ENV === "development") {
				console.log(error.message);
			} else {
				DiscordService.logError(error);
			}
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
	 * Loads all the Routers
	 */
	private loadRouters() {
		// TODO: Change routes
		this.app.use("/steam-workshop-stats", steamRouter);
	}

	/**
	 * Loads all the Middlewares
	 */
	private async loadMiddlewares() {
		// TODO: Move check to Logger
		if (process.env.NODE_ENV === "production") {
			await IpsMiddleware.initialize();
			this.app.use(IpsMiddleware.processQuery);
			this.app.use(logMiddleware);
		}

		this.app.use(errorMiddleware);
	}
}

const app = new App();
await app.start();

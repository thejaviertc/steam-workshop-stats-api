import cors from "cors";
import express, { Express } from "express";
import ErrorMiddleware from "./middlewares/ErrorMiddleware.js";
import IpsMiddleware from "./middlewares/IpsMiddleware.js";
import LogAccessMiddleware from "./middlewares/LogAccessMiddleware.js";
import SteamUserRouter from "./routers/SteamUserRouter.js";
import DiscordService from "./services/DiscordService.js";

class App {
	private readonly app: Express;

	public constructor() {
		this.app = express();

		this.setupConfig();
		this.loadMiddlewares();
		this.loadRouters();

		this.app.listen(process.env.PORT ?? 3000, () => {
			// TODO: Log in Discord
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
	 * Loads all the Routers
	 */
	private loadRouters() {
		this.app.use("/steam-user", SteamUserRouter);
	}

	/**
	 * Loads all the Middlewares
	 */
	private loadMiddlewares() {
		this.app.use(IpsMiddleware);
		this.app.use(LogAccessMiddleware);
		this.app.use(ErrorMiddleware);
	}
}

const _app = new App();

process.on("uncaughtException", (error: Error) => {
	if (process.env.NODE_ENV === "production") {
		DiscordService.logError(error);
	} else {
		console.log(error.message);
	}
});

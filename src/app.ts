import cors from "cors";
import express, { Express } from "express";
import session from "express-session";
import passport from "passport";
import SteamStrategy from "passport-steam";

import ErrorHandlerMiddleware from "./middlewares/ErrorHandlerMiddleware.js";
import IMiddleware from "./middlewares/IMiddleware.js";
import IpsMiddleware from "./middlewares/IpsMiddleware.js";
import LogAccessMiddleware from "./middlewares/LogAccessMiddleware.js";

import AuthRouter from "./routers/AuthRouter.js";
import SteamUserRouter from "./routers/SteamUserRouter.js";
import DiscordService from "./services/DiscordService.js";

class App {
	private readonly app: Express;

	public constructor() {
		this.app = express();
	}

	/**
	 * Initializes the app
	 */
	public start() {
		this.setupExpressConfig();
		this.setupPassportConfig();

		this.loadMiddlewares();
		this.loadRouters();

		this.app.use(ErrorHandlerMiddleware);

		this.app.listen(process.env.PORT ?? 3000, () => {
			console.log("App running");
		});
	}

	/**
	 * Setups Express related configs
	 */
	private setupExpressConfig() {
		this.app.use(express.urlencoded({ extended: false }));
		this.app.disable("x-powered-by");

		this.app.use(
			cors({
				origin: process.env.NODE_ENV === "production" ? process.env.FRONTEND_DOMAIN : "*",
			}),
		);

		this.app.use(
			session({
				secret: process.env.SECRET_SESSION!,
				resave: true,
				saveUninitialized: true,
			}),
		);
	}

	/**
	 * Setups Passport related configs
	 */
	private setupPassportConfig() {
		passport.serializeUser((user, done) => {
			done(null, user);
		});

		passport.deserializeUser((obj: null, done) => {
			done(null, obj);
		});

		const url =
			process.env.NODE_ENV === "production"
				? process.env.BACKEND_DOMAIN
				: "http://localhost:3000";

		passport.use(
			new SteamStrategy.Strategy(
				{
					returnURL: `${url}/auth/return`,
					realm: url,
					apiKey: process.env.STEAM_API,
				},
				(identifier, profile, done) => {
					process.nextTick(() => {
						profile.identifier = identifier;
						return done(null, profile);
					});
				},
			),
		);

		this.app.use(passport.initialize());
		this.app.use(passport.session());
	}

	/**
	 * Loads all the Middlewares
	 */
	private loadMiddlewares() {
		const middlewares: IMiddleware[] = [];

		if (process.env.NODE_ENV === "production") {
			middlewares.push(LogAccessMiddleware);
			middlewares.push(IpsMiddleware);
		}

		for (const middleware of middlewares) {
			this.app.use(middleware.execute.bind(middleware));
		}
	}

	/**
	 * Loads all the Routers
	 */
	private loadRouters() {
		this.app.use("/auth", AuthRouter);
		this.app.use("/steam-user", SteamUserRouter);
	}
}

const app = new App();
app.start();

process.on("uncaughtException", (error) => {
	if (process.env.NODE_ENV === "production") {
		DiscordService.logUnhandledError(error);
	} else {
		console.log(error.message);
	}
});

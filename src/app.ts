import cors from "cors";
import express, { Express } from "express";
import passport from "passport";
import SteamStrategy from "passport-steam";
import ErrorHandler from "./errors/ErrorHandler.js";
import IpsMiddleware from "./middlewares/IpsMiddleware.js";
import LogAccessMiddleware from "./middlewares/LogAccessMiddleware.js";
import AuthRouter from "./routers/AuthRouter.js";
import SteamUserRouter from "./routers/SteamUserRouter.js";

class App {
	private readonly app: Express;

	public constructor() {
		this.app = express();

		this.setupConfig();
		this.setupAuth();
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
				origin:
					process.env.NODE_ENV === "production" ? "https://thejaviertc.github.io" : "*",
			})
		);
	}

	/**
	 * Setups the auth system of the app
	 */
	private setupAuth() {
		passport.serializeUser((user, done) => {
			done(null, user);
		});

		passport.deserializeUser((obj, done) => {
			done(null, obj);
		});

		passport.use(
			new SteamStrategy.Strategy(
				{
					returnURL: "http://localhost:3000/auth/callback",
					realm: "http://localhost:3000/",
					apiKey: process.env.STEAM_API,
				},
				async (identifier: any, profile: any, done: any) => {
					profile.identifier = identifier;

					return done(null, user);
				}
			)
		);

		this.app.use(passport.initialize());
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
		this.app.use("/login", AuthRouter);
		this.app.use("/steam-user", SteamUserRouter);
	}
}

const _app = new App();

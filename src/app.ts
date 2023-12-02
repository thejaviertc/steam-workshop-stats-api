/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import cors from "cors";
import express, { Express } from "express";
import session from "express-session";
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

		this.setupExpressConfig();
		this.setupPassportConfig();
		this.loadMiddlewares();
		this.loadRouters();

		this.app.use(ErrorHandler);

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
				origin:
					process.env.NODE_ENV === "production" ? "https://thejaviertc.github.io" : "*",
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
				? "https://steam-workshop-stats-api.onrender.com"
				: "http://localhost:3000";

		passport.use(
			new SteamStrategy.Strategy(
				{
					returnURL: `${url}/auth/return`,
					realm: url,
					apiKey: process.env.STEAM_API,
				},
				(identifier: any, profile: any, done: any) => {
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
		this.app.use(IpsMiddleware);
		this.app.use(LogAccessMiddleware);
	}

	/**
	 * Loads all the Routers
	 */
	private loadRouters() {
		this.app.use("/auth", AuthRouter);
		this.app.use("/steam-user", SteamUserRouter);
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _app = new App();

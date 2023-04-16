// Imports
import cors from "cors";
import express from "express";
import session from "express-session";
import passport from "passport";
import SteamStrategy from "passport-steam";

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((obj, done) => {
	done(null, obj);
});

const steamStrategy = new SteamStrategy.Strategy(
	{
		returnURL: "http://localhost:3000/auth/steam/callback",
		realm: "http://localhost:3000/",
		apiKey: process.env.STEAM_API,
	},
	(identifier, profile, done) => {
		process.nextTick(() => {
			profile.identifier = identifier;
			return done(null, profile);
		});
	}
);

passport.use(steamStrategy);

// Routes
import steamRouter from "./routes/steam.routes.js";

// Middlewares
import errorMiddleware from "./middlewares/error.middleware.js";
import IpsMiddleware from "./middlewares/ips.middleware.js";
import logMiddleware from "./middlewares/log.middleware.js";
import DiscordService from "./services/DiscordService.js";

// Express
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		name: "name of session id",
		resave: true,
		saveUninitialized: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());

// Express Middlewares
if (process.env.NODE_ENV === "production") {
	await IpsMiddleware.initialize();
	app.use(IpsMiddleware.processQuery);
	app.use(logMiddleware);
}

app.get("/", (req, res) => {
	res.send(req.user);
});

app.get("/account", ensureAuthenticated, function (req, res) {
	res.send(req.user);
});

app.get("/logout", function (req, res) {
	req.logout(function (err) {
		if (err) {
			throw err;
		}
		res.redirect("/");
	});
});

app.get("/auth/steam", passport.authenticate("steam", { failureRedirect: "/" }), (req, res) => {
	res.redirect("/");
});

app.get(
	"/auth/steam/callback",
	passport.authenticate("steam", { failureRedirect: "/" }),
	(req, res) => {
		res.redirect("/");
	}
);

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/");
}

app.use("/steam-workshop-stats", steamRouter);
app.use(errorMiddleware);

app.listen(process.env.PORT || 3000, () => {
	console.log("App running");
});

process.on("uncaughtException", (error: Error) => {
	if (process.env.NODE_ENV === "development") {
		console.log(error.message);
	} else {
		DiscordService.logError(error);
	}
});

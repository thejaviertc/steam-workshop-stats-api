// Imports
import cors from "cors";
import express from "express";

// Routes
import steamRouter from "./routes/steam.routes.js";

// Middlewares
import errorMiddleware from "./middlewares/error.middleware.js";
import IpsMiddleware from "./middlewares/ips.middleware.js";
import logMiddleware from "./middlewares/log.middleware.js";
import DiscordService from "./services/DiscordService.js";

// Express
const app = express();
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Express Middlewares
if (process.env.NODE_ENV === "production") {
	await IpsMiddleware.initialize();
	app.use(IpsMiddleware.processQuery);
	app.use(logMiddleware);
}

app.use("/steam-workshop-stats", steamRouter);
app.use(errorMiddleware);

app.listen(process.env.PORT ?? 3000, () => {
	console.log("App running");
});

process.on("uncaughtException", (error: Error) => {
	if (process.env.NODE_ENV === "development") {
		console.log(error.message);
	} else {
		DiscordService.logError(error);
	}
});

import SteamController from "../controllers/SteamController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import Router from "./Router.js";

class SteamUserRouter extends Router {
	public constructor() {
		super();
	}

	/**
	 * Loads the routes
	 */
	public override loadRoutes() {
		this.router.get(
			"/id/:profileId",
			AuthMiddleware,
			SteamController.getSteamUserByProfileId.bind(SteamController),
		);

		this.router.get(
			"/profiles/:steamId",
			AuthMiddleware,
			SteamController.getSteamUserBySteamId.bind(SteamController),
		);
	}
}

export default new SteamUserRouter().router;

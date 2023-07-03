import SteamController from "../controllers/SteamController.js";
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
			SteamController.getSteamUserByProfileId.bind(SteamController)
		);

		this.router.get(
			"/profiles/:steamId",
			SteamController.getSteamUserBySteamId.bind(SteamController)
		);
	}
}

export default new SteamUserRouter().router;

import SteamController from "../controllers/SteamController.js";
import BasicRouter from "./BasicRouter.js";

class SteamUserRouter extends BasicRouter {
	public constructor() {
		super();
	}

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

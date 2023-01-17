import SteamApi from "../services/SteamAPI.js";
import SteamUser from "../models/SteamUser.js";
import DiscordAPI from "../services/DiscordAPI.js";

/**
 * Steam User's Controller
 */
class SteamController {
	/**
	 * Obtains the info of the Steam User and sends it
	 * @param req
	 * @param res
	 */
	public async getSteamUser(req, res) {
		const url: string = req.query.url;

		// Prevents continuing if the url isn't valid
		if (!SteamUser.isProfileUrlValid(url))
			return res.status(400).send({ message: "This URL is not valid!" });

		// Fetches the SteamID
		const steamId = await SteamApi.fetchSteamId(url);

		// Fetches the basic info of the user
		const basicInfo = await SteamApi.fetchBasicInfo(steamId);

		// Checks if the profile is valid
		if (basicInfo == null)
			return res
				.status(400)
				.send({ message: "This user doesn't exists!" });

		// Fetches all the addons info
		const addonsInfo = await SteamApi.fetchAddonsInfo(steamId);

		res.send(
			new SteamUser(
				steamId,
				basicInfo.personaname,
				basicInfo.avatarfull,
				addonsInfo.subs,
				addonsInfo.lifeSubs,
				addonsInfo.favs,
				addonsInfo.lifeFavs,
				addonsInfo.viewers,
				addonsInfo.addons
			)
		);

		// Logs the query
		DiscordAPI.logValidQuery(url);
	}
}

export default new SteamController();

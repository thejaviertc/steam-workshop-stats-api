import UsernameNotFoundError from "../errors/UsernameNotFoundError.js";
import SteamUser from "../models/SteamUser.js";
import DiscordAPI from "../services/DiscordAPI.js";
import SteamService from "../services/SteamService.js";

class SteamController {
	/**
	 * Returns the info of the Steam User
	 * @param req
	 * @param res
	 */
	public async getSteamUser(req, res) {
		const url: string = req.query.url;

		if (!SteamUser.isProfileUrlValid(url))
			return res.status(400).send({ message: "This URL is not valid!" });

		// Get the type of url and it's value
		const pattern = /https:\/\/steamcommunity.com\/(?<type>.*)\/(?<value>.*)/;
		const regex = pattern.exec(url);

		const urlType = regex.groups.type;
		const urlValue = regex.groups.value;

		// Get the value from the URL (if it's profile) or fetch it if not
		let steamId: string = urlValue;

		try {
			if (urlType === "id")
				steamId = await SteamService.fetchSteamId(urlValue);

			const [basicInfo, addonsInfo] = await Promise.all([SteamService.fetchBasicInfo(steamId), SteamService.fetchAddonsInfo(steamId)]);

			res.send(
				new SteamUser(
					steamId,
					basicInfo.username,
					basicInfo.profileImage,
					addonsInfo.subs,
					addonsInfo.lifeSubs,
					addonsInfo.favs,
					addonsInfo.lifeFavs,
					addonsInfo.viewers,
					addonsInfo.addons
				)
			);
		} catch (error) {
			if (error instanceof UsernameNotFoundError)
				res.status(400).send({ message: error.message });
			else
				res.status(500).send({ message: error.message });
		}

		// // Logs the query
		// DiscordAPI.logValidQuery(url);
	}
}

export default new SteamController();

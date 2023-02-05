import UrlNotValidError from "../errors/UrlNotValidError.js";
import SteamUser from "../models/SteamUser.js";
import DiscordService from "../services/DiscordService.js";
import SteamService from "../services/SteamService.js";

class SteamController {
	/**
	 * Returns the info of the Steam User
	 * @param req
	 * @param res
	 */
	public async getSteamUser(req, res) {
		try {
			let url: string = req.query.url;

			if (!SteamUser.isProfileUrlValid(url))
				throw new UrlNotValidError();

			if (url.endsWith("/"))
				url = url.substring(0, url.length - 1);

			// Get the type of url and it's value
			const pattern = /https:\/\/steamcommunity.com\/(?<type>.*)\/(?<value>.*)/;
			const regex = pattern.exec(url);

			const urlType = regex.groups.type;
			const urlValue = regex.groups.value;

			// Get the value from the URL (if it's profile) or fetch it if not
			let steamId: string = urlValue;

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

			DiscordService.logQuery(req);
		} catch (error) {
			DiscordService.logQuery(req, error.message);
			res.status(error.httpCode).send({ message: error.message });
		}
	}
}

export default new SteamController();

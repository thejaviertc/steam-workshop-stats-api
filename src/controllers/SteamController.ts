import { Request, Response } from "express";
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
	public async getSteamUser(req: Request, res: Response) {
		try {
			const url: string = req.query.url as string;

			if (!SteamUser.isProfileUrlValid(url)) throw new UrlNotValidError();

			// Get the type of url and it's value
			const pattern =
				/https:\/\/steamcommunity.com\/(?<type>(id|profiles))\/(?<value>[a-zA-Z0-9]+)\/?/;
			const regex = pattern.exec(url);

			const urlType = regex?.groups?.type;
			const urlValue = regex?.groups?.value ?? "";

			// Get the value from the URL (if it's profile) or fetch it if not
			let steamId: string = urlValue;

			if (urlType === "id") steamId = await SteamService.fetchSteamId(urlValue);

			const [basicInfo, addonsInfo] = await Promise.all([
				SteamService.fetchBasicInfo(steamId),
				SteamService.fetchAddonsInfo(steamId),
			]);

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
		} catch (error: any) {
			DiscordService.logQuery(req, error.message);
			res.status(error.httpCode).send({ message: error.message });
		}
	}
}

export default new SteamController();

import { NextFunction, Request, Response } from "express";
import ProfileIdNotValidError from "../errors/ProfileIdNotValidError.js";
import SteamIdNotValidError from "../errors/SteamIdNotValidError.js";
import SteamUser from "../models/SteamUser.js";
import DiscordService from "../services/DiscordService.js";
import SteamService from "../services/SteamService.js";

class SteamController {
	/**
	 * Gets a Steam User using the profile id
	 */
	public async getSteamUserByProfileId(req: Request, res: Response, next: NextFunction) {
		try {
			const profileId = req.params.profileId;

			if (!SteamUser.isProfileIdValid(profileId)) {
				throw new ProfileIdNotValidError();
			}

			const steamId = await SteamService.getSteamIdFromProfileId(profileId);

			this.getSteamUser(req, res, next, steamId);
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Gets a Steam User using the SteamID
	 */
	public async getSteamUserBySteamId(req: Request, res: Response, next: NextFunction) {
		try {
			const steamId = req.params.steamId;

			if (!SteamUser.isSteamIdValid(steamId)) {
				throw new SteamIdNotValidError();
			}

			this.getSteamUser(req, res, next, steamId);
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Gets a Steam User
	 */
	private async getSteamUser(req: Request, res: Response, next: NextFunction, steamId: string) {
		try {
			const [basicInfo, addonsInfo] = await Promise.all([
				SteamService.getSteamUserBasicInfo(steamId),
				SteamService.getAllSteamUserAddons(steamId),
			]);

			res.send(
				new SteamUser(
					steamId,
					basicInfo.username,
					basicInfo.profileImage,
					addonsInfo.views,
					addonsInfo.subscribers,
					addonsInfo.favorites,
					addonsInfo.likes,
					addonsInfo.dislikes,
					addonsInfo.addons
				)
			);

			DiscordService.logQuery(req);
		} catch (error) {
			next(error);
		}
	}
}

export default new SteamController();

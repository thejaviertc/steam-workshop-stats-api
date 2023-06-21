import axios from "axios";
import AddonsNotFoundError from "../errors/AddonsNotFoundError.js";
import BasicInfoNotFoundError from "../errors/BasicInfoNotFoundError.js";
import SteamIdNotFoundError from "../errors/SteamIdNotFoundError.js";
import UsernameNotFoundError from "../errors/UsernameNotFoundError.js";
import Addon from "../models/Addon.js";
import IAddonListResponse from "./IAddonListResponse.js";
import ISteamService from "./ISteamService.js";

class SteamService implements ISteamService {
	/**
	 * Gets the SteamID of the Steam User from the ProfileID
	 */
	public async getSteamIdFromProfileId(profileId: string): Promise<string> {
		try {
			const response = await axios.get(
				`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${process.env.STEAM_API}&vanityurl=${profileId}`
			);

			return response.data.response.steamid;
		} catch (error) {
			throw new SteamIdNotFoundError();
		}
	}

	/**
	 * Gets the username and profile image of the Steam User
	 */
	public async getSteamUserBasicInfo(steamId: string) {
		try {
			const response = await axios.get(
				`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_API}&steamids=${steamId}`
			);

			if (response.data.response.players.length === 0) {
				throw new UsernameNotFoundError();
			}

			return {
				username: response.data.response.players[0].personaname,
				profileImage: response.data.response.players[0].avatarfull,
			};
		} catch (error) {
			if (error instanceof UsernameNotFoundError) {
				throw error;
			}

			throw new BasicInfoNotFoundError();
		}
	}

	/**
	 * Gets all the addons of a Steam User
	 */
	public async getAllSteamUserAddons(steamId: string) {
		let response;

		try {
			response = await axios.get(
				`https://api.steampowered.com/IPublishedFileService/GetUserFiles/v1/?key=${process.env.STEAM_API}&steamid=${steamId}&numperpage=500&return_vote_data=true`
			);
		} catch (error) {
			throw new AddonsNotFoundError();
		}

		const addonsInfo = {
			views: 0,
			subscribers: 0,
			favorites: 0,
			likes: 0,
			dislikes: 0,
			addons: [] as Addon[],
		};

		if (response.data.response.total > 0) {
			response.data.response.publishedfiledetails.forEach((addon: IAddonListResponse) => {
				addonsInfo.views += addon.views;
				addonsInfo.subscribers += addon.subscriptions;
				addonsInfo.favorites += addon.favorited;
				addonsInfo.likes += addon.vote_data.votes_up;
				addonsInfo.dislikes += addon.vote_data.votes_down;

				addonsInfo.addons.push(
					new Addon(
						addon.publishedfileid,
						addon.title,
						addon.preview_url,
						addon.views,
						addon.subscriptions,
						addon.favorited,
						addon.vote_data.votes_up,
						addon.vote_data.votes_down,
						this.obtainNumberOfStars(
							addon.vote_data.votes_up + addon.vote_data.votes_down,
							addon.vote_data.score
						)
					)
				);
			});

			// Sorts addons by release date
			addonsInfo.addons.sort((a: Addon, b: Addon): number => {
				return b.getId() - a.getId();
			});
		}

		return addonsInfo;
	}

	/**
	 * Gets the number of starts of an Addon
	 */
	private obtainNumberOfStars(numberVotes: number, score: number): number {
		if (numberVotes >= 25) {
			return Math.ceil(score * 5);
		}

		return 0;
	}
}

export default new SteamService();

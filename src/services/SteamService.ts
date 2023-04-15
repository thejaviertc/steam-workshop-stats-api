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
	 * Fetches the Steam API and returns the SteamID of the user
	 * @param id
	 * @returns string
	 */
	public async fetchSteamId(id: string): Promise<string> {
		try {
			const response = await axios.get(
				`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${process.env.STEAM_API}&vanityurl=${id}`
			);

			return response.data.response.steamid;
		} catch (error) {
			throw new SteamIdNotFoundError();
		}
	}

	/**
	 * Fetches the Steam API and returns the username and profile image of the user
	 * @param steamId
	 * @returns Object
	 */
	public async fetchBasicInfo(steamId: string) {
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
	 * Fetches the Steam API and returns a list of addons of the user
	 * @param steamId
	 * @returns Object
	 */
	public async fetchAddonsInfo(steamId: string) {
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
						addon.vote_data.votes_down
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
}

export default new SteamService();

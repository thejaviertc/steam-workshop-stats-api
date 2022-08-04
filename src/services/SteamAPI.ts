import Addon from "../models/Addon.js";
import axios from "axios";
import ISteamAPI from "./ISteamAPI.js";

/**
 * Class for fetching the Steam API
 */
class SteamApi implements ISteamAPI {
	/**
	 * Fetches the Steam API and returns the SteamID of the user
	 * @param url
	 * @returns string
	 */
	public async fetchSteamId(url: string): Promise<string> {
		let steamid;
		const splittedUrl = url.split("/");

		// Gets the part of the ID from the url
		url = splittedUrl[4];

		// Depending of the type of the url
		if (splittedUrl.includes("id")) {
			try {
				const response = await axios.get(
					`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${process.env.STEAM_API}&vanityurl=${url}`
				);
				steamid = response.data.response.steamid;
			} catch (error) {
				throw new Error("Steam API fetching SteamID failed");
			}
		} else steamid = url;

		return steamid;
	}

	/**
	 * Fetches the Steam API and returns the username and profile image of the user
	 * @param steamId
	 * @returns Object
	 */
	public async fetchBasicInfo(steamId: string) {
		let response;

		try {
			response = await axios.get(
				`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_API}&steamids=${steamId}`
			);
		} catch (error) {
			throw new Error("Steam API fetching basic info failed");
		}

		return response.data.response.players[0];
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
		} catch (error) {}

		// Variables for storing the count and list of addons
		const addonsInfo = {
			subs: 0,
			lifeSubs: 0,
			favs: 0,
			lifeFavs: 0,
			viewers: 0,
			addons: [],
		};

		// Creates a list with all the addons
		if (response.data.response.total > 0) {
			response.data.response.publishedfiledetails.forEach((addon) => {
				// Sums all addon's stats
				addonsInfo.subs += addon.subscriptions;
				addonsInfo.lifeSubs += addon.lifetime_subscriptions;
				addonsInfo.favs += addon.favorited;
				addonsInfo.lifeFavs += addon.lifetime_favorited;
				addonsInfo.viewers += addon.views;

				addonsInfo.addons.push(
					new Addon(
						addon.publishedfileid,
						addon.title,
						addon.preview_url,
						`https://steamcommunity.com/sharedfiles/filedetails/?id=${addon.publishedfileid}`,
						addon.subscriptions,
						addon.lifetime_subscriptions,
						addon.favorited,
						addon.lifetime_favorited,
						addon.views,
						addon.vote_data.votes_up,
						addon.vote_data.votes_down
					)
				);
			});
		}

		// Sorts addons by release date
		addonsInfo.addons = addonsInfo.addons.sort(
			(a: Addon, b: Addon): number => {
				return b.getId() - a.getId();
			}
		);

		return addonsInfo;
	}
}

export default new SteamApi();

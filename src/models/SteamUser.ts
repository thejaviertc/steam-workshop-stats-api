import Addon from "./Addon.js";

class SteamUser {
	private readonly steamId: string;
	private readonly username: string;
	private readonly profileImage: string;
	private readonly subs: number;
	private readonly lifeSubs: number;
	private readonly favs: number;
	private readonly lifeFavs: number;
	private readonly viewers: number;
	private readonly addons: Addon[];

	public constructor(
		steamId: string,
		username: string,
		profileImage: string,
		subs: number,
		lifeSubs: number,
		favs: number,
		lifeFavs: number,
		viewers: number,
		addons: Addon[]
	) {
		this.steamId = steamId;
		this.username = username;
		this.profileImage = profileImage;
		this.subs = subs;
		this.lifeSubs = lifeSubs;
		this.favs = favs;
		this.lifeFavs = lifeFavs;
		this.viewers = viewers;
		this.addons = addons;
	}

	/**
	 * Checks if the profile url is valid
	 * @param url
	 * @returns boolean
	 */
	public static isProfileUrlValid(url: string): boolean {
		const urlPattern = /https:\/\/steamcommunity.com\/(id|profiles)\/*/;
		return urlPattern.test(url);
	}
}

export default SteamUser;

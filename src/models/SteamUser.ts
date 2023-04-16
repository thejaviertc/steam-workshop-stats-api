import Addon from "./Addon.js";

class SteamUser {
	private readonly steamId: string;
	private readonly username: string;
	private readonly profileImage: string;
	private readonly views: number;
	private readonly subscribers: number;
	private readonly favorites: number;
	private readonly likes: number;
	private readonly dislikes: number;
	private readonly addons: Addon[];

	public constructor(
		steamId: string,
		username: string,
		profileImage: string,
		views: number,
		subscribers: number,
		favorites: number,
		likes: number,
		dislikes: number,
		addons: Addon[]
	) {
		this.steamId = steamId;
		this.username = username;
		this.profileImage = profileImage;
		this.views = views;
		this.subscribers = subscribers;
		this.favorites = favorites;
		this.likes = likes;
		this.dislikes = dislikes;
		this.addons = addons;
	}

	/**
	 * Checks if the profile url is valid
	 * @param url
	 * @returns boolean
	 */
	public static isProfileUrlValid(url: string): boolean {
		const urlPattern = /https:\/\/steamcommunity.com\/(id|profiles)\/[a-zA-Z0-9]+\/?/;
		return urlPattern.test(url);
	}
}

export default SteamUser;

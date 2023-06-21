import Addon from "./Addon.js";

export default class SteamUser {
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
	 * Checks if the user profile id is valid
	 */
	public static isProfileIdValid(profileId: string): boolean {
		const pattern = /\w/;
		return pattern.test(profileId);
	}

	/**
	 * Checks if the SteamID is valid
	 */
	public static isSteamIdValid(steamId: string): boolean {
		const pattern = /\d/;
		return pattern.test(steamId);
	}
}

import Addon from "./Addon.js";

class SteamUser {
	private steamId: string;
	private username: string;
	private profileImage: string;
	private subs: number;
	private lifeSubs: number;
	private favs: number;
	private lifeFavs: number;
	private viewers: number;
	private addons: Addon[];

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

	public getSteamId(): string {
		return this.steamId;
	}

	public setSteamId(steamId: string) {
		this.steamId = steamId;
	}

	public getUsername(): string {
		return this.username;
	}

	public setUsername(username: string) {
		this.username = username;
	}

	public getProfileImage(): string {
		return this.profileImage;
	}

	public setProfileImage(profileImage: string) {
		this.profileImage = profileImage;
	}

	public getSubs(): number {
		return this.subs;
	}

	public setSubs(subs: number) {
		this.subs = subs;
	}

	public getLifeSubs(): number {
		return this.lifeSubs;
	}

	public setLifeSubs(lifeSubs: number) {
		this.lifeSubs = lifeSubs;
	}

	public getFavs(): number {
		return this.favs;
	}

	public setFavs(favs: number) {
		this.favs = favs;
	}

	public getLifeFavs(): number {
		return this.lifeFavs;
	}

	public setLifeFavs(lifeFavs: number) {
		this.lifeFavs = lifeFavs;
	}

	public getViewers(): number {
		return this.viewers;
	}

	public setViewers(viewers: number) {
		this.viewers = viewers;
	}

	public addAddon(addon: Addon) {
		this.addons.push(addon);
	}

	public getAddon(id: number): Addon | undefined {
		return this.addons.find((addon: Addon) => addon.getId() === id);
	}

	public removeAddon(id: number) {
		let found = false;

		for (let i = 0; i < this.addons.length && found; i++) {
			if (this.addons[i].getId() === id) {
				this.addons.splice(i, 1);
				found = true;
			}
		}
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

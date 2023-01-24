class Addon {
	private id: number;
	private title: string;
	private image: string;
	private url: string;
	private subs: number;
	private lifeSubs: number;
	private favs: number;
	private lifeFavs: number;
	private viewers: number;
	private likes: number;
	private dislikes: number;

	public constructor(
		id: number,
		title: string,
		image: string,
		url: string,
		subs: number,
		lifeSubs: number,
		favs: number,
		lifeFavs: number,
		viewers: number,
		likes: number,
		dislikes: number
	) {
		this.id = id;
		this.title = title;
		this.image = image;
		this.url = url;
		this.subs = subs;
		this.lifeSubs = lifeSubs;
		this.favs = favs;
		this.lifeFavs = lifeFavs;
		this.viewers = viewers;
		this.likes = likes;
		this.dislikes = dislikes;
	}

	public getId(): number {
		return this.id;
	}

	public setId(id: number) {
		this.id = id;
	}

	public getTitle(): string {
		return this.title;
	}

	public setTitle(title: string) {
		this.title = title;
	}

	public getImage(): string {
		return this.image;
	}

	public setImage(image: string) {
		this.image = image;
	}

	public getUrl(): string {
		return this.url;
	}

	public setUrl(url: string) {
		this.url = url;
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

	public getLikes(): number {
		return this.likes;
	}

	public setLikes(likes: number) {
		this.likes = likes;
	}

	public getDislikes(): number {
		return this.dislikes;
	}

	public setDislikes(dislikes: number) {
		this.dislikes = dislikes;
	}
}

export default Addon;

class Addon {
	private readonly id: number;
	private readonly title: string;
	private readonly image: string;
	private readonly url: string;
	private readonly subs: number;
	private readonly lifeSubs: number;
	private readonly favs: number;
	private readonly lifeFavs: number;
	private readonly viewers: number;
	private readonly likes: number;
	private readonly dislikes: number;

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
}

export default Addon;

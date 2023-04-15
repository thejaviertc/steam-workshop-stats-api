class Addon {
	private readonly id: number;
	private readonly title: string;
	private readonly image: string;
	private readonly views: number;
	private readonly subscribers: number;
	private readonly favorites: number;
	private readonly likes: number;
	private readonly dislikes: number;

	public constructor(
		id: number,
		title: string,
		image: string,
		views: number,
		subscribers: number,
		favorites: number,
		likes: number,
		dislikes: number
	) {
		this.id = id;
		this.title = title;
		this.image = image;
		this.views = views;
		this.subscribers = subscribers;
		this.favorites = favorites;
		this.likes = likes;
		this.dislikes = dislikes;
	}

	public getId(): number {
		return this.id;
	}
}

export default Addon;

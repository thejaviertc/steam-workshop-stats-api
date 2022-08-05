/**
 * Class for storing Stream information
 */
class Stream {
	private title: string;
	private image: string;
	private url: string;
	private streamedAt: string;
	private views: number;

	public constructor(
		title: string,
		image: string,
		url: string,
		streamedAt: string,
		viewers: number
	) {
		this.title = title;
		this.image = image;
		this.url = url;
		this.streamedAt = streamedAt;
		this.views = viewers;
	}

	public getTitle(): string {
		return this.title;
	}

	public setTitle(title: string) {
		this.title = title;
	}

	public getImage(): String {
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

	public getStreamedAt(): string {
		return this.streamedAt;
	}

	public setStreamedAt(streamedAt: string) {
		this.streamedAt = streamedAt;
	}

	public getViewers(): number {
		return this.views;
	}

	public setViewers(views: number) {
		this.views = views;
	}
}

export default Stream;

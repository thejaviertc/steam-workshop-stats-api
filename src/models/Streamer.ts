import Stream from "./Stream.js";
import TStreamer from "./TStreamer.js";

/**
 * Class for storing all the Streamer information
 */
class Streamer {
	private id: string;
	private username: string;
	private profileImage: string;
	private createdAt: string;
	private type: TStreamer;
	private followers: number;
	private viewers: number;
	private streams: Stream[];

	public constructor(
		id: string,
		username: string,
		profileImage: string,
		createdAt: string,
		type: TStreamer,
		followers: number,
		viewers: number,
		streams: Stream[]
	) {
		this.id = id;
		this.username = username;
		this.profileImage = profileImage;
		this.createdAt = createdAt;
		this.type = type;
		this.followers = followers;
		this.viewers = viewers;
		this.streams = streams;
	}

	public getId(): string {
		return this.id;
	}
	public setId(id: string) {
		this.id = id;
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

	public getCreatedAt(): string {
		return this.createdAt;
	}

	public setCreatedAt(createdAt: string) {
		this.createdAt = createdAt;
	}

	public getType(): TStreamer {
		return this.type;
	}

	public setType(type: TStreamer) {
		this.type = type;
	}

	public getFollowers(): number {
		return this.followers;
	}

	public setFollowers(followers: number) {
		this.followers = followers;
	}

	public getViewers(): number {
		return this.viewers;
	}

	public setViewers(viewers: number) {
		this.viewers = viewers;
	}

	public addStream(stream: Stream) {
		this.streams.push(stream);
	}

	public getStream(title: string): Stream {
		return this.streams.find((stream) => stream.getTitle() == title);
	}

	public removeStream(title: string) {
		let found = false;

		for (let i = 0; i < this.streams.length && found; i++) {
			if (this.streams[i].getTitle() == title) {
				this.streams.splice(i, 1);
				found = true;
			}
		}
	}

	/**
	 * Checks if the streamer url is valid
	 * @param url
	 * @returns boolean
	 */
	public static isStreamerUrlValid(url: string): boolean {
		const urlPattern = /https:\/\/(www.)?twitch.tv\/*/;
		return urlPattern.test(url);
	}
}

export default Streamer;

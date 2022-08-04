import axios from "axios";
import Stream from "../models/Stream.js";
import ITwitchAPI from "./ITwitchAPI.js";

/**
 * Class for fetching the Twitch API
 */
export default class TwitchAPI implements ITwitchAPI {
	private token: string;

	public constructor(token: string) {
		this.token = token;
	}

	public getToken(): string {
		return this.token;
	}

	public setToken(token: string) {
		this.token = token;
	}

	/**
	 * Fetches the Twitch API and returns the basic info of the streamer
	 * @param streamer
	 * @returns object
	 */
	public async fetchBasicInfo(streamer: string) {
		let response;

		try {
			response = await axios({
				method: "GET",
				url: `https://api.twitch.tv/helix/users?login=${streamer}`,
				headers: {
					"Client-ID": process.env.TWITCH_CLIENT_ID,
					Authorization: `Bearer ${this.token}`,
				},
			});
		} catch (error) {
			throw new Error("Twitch API fetching basic info failed");
		}

		return response.data.data[0];
	}

	/**
	 * Fetches the Twitch API and returns the number of followers of the streamer
	 * @param id
	 * @returns number
	 */
	public async fetchFollowers(id: string): Promise<number> {
		let response;

		try {
			response = await axios({
				method: "GET",
				url: `https://api.twitch.tv/helix/users/follows?to_id=${id}`,
				headers: {
					"Client-ID": process.env.TWITCH_CLIENT_ID,
					Authorization: `Bearer ${this.token}`,
				},
			});
		} catch (error) {
			throw new Error("Twitch API fetching followers failed");
		}

		return response.data.total;
	}

	/**
	 * Fetches the Twitch API and returns the streams of the streamer
	 * @param id
	 * @returns object
	 */
	public async fetchStreams(id: string) {
		let response;

		try {
			response = await axios({
				method: "GET",
				url: `https://api.twitch.tv/helix/videos?user_id=${id}`,
				headers: {
					"Client-ID": process.env.TWITCH_CLIENT_ID,
					Authorization: `Bearer ${this.token}`,
				},
			});
		} catch (error) {
			throw new Error("Twitch API fetching streams failed");
		}

		const streams = [];

		// Creates a Stream object for each stream
		response.data.data.forEach((stream) => {
			streams.push(
				new Stream(
					stream.title,
					stream.thumbnail_url,
					stream.url,
					new Date(stream.published_at).toDateString(),
					stream.view_count
				)
			);
		});

		return streams;
	}

	/**
	 * Fetches the Twitch API and returns a token for making requests
	 * @returns string
	 */
	public static async generateToken(): Promise<string> {
		let response;

		try {
			response = await axios({
				method: "POST",
				url: "https://id.twitch.tv/oauth2/token",
				data: {
					client_id: process.env.TWITCH_CLIENT_ID,
					client_secret: process.env.TWITCH_SECRET,
					grant_type: "client_credentials",
				},
			});
		} catch (error) {
			throw new Error("Twitch API fetching token failed");
		}

		return response.data.access_token;
	}
}

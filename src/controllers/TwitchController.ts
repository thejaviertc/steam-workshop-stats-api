import Streamer from "../models/Streamer.js";
import TStreamer from "../models/TStreamer.js";
import DiscordAPI from "../services/DiscordAPI.js";
import TwitchApi from "../services/TwitchAPI.js";

/**
 * Twitch Controller
 */
class TwitchController {
	/**
	 * Obtains the info of the Twitch Streamer and sends it
	 * @param req
	 * @param res
	 */
	public async getStreamer(req, res) {
		const url = req.query.url;

		// Prevents continuing if the url isn't valid
		if (!Streamer.isStreamerUrlValid(url))
			return res.status(400).send({ message: "This URL is not valid!" });

		// Gets the streamer name from the URL
		const streamer = url.split("/")[3];

		// Initializes a connection with the Twitch API
		const TwitchAPI = new TwitchApi(await TwitchApi.generateToken());

		// Fetches the basic info of the streamer
		const basicInfo = await TwitchAPI.fetchBasicInfo(streamer);

		// If the streamer doesn't exits
		if (basicInfo == null)
			return res
				.status(400)
				.send({ message: "This streamer doesn't exists!" });

		// Converts the creation date into string
		const createdAt = new Date(basicInfo.created_at).toDateString();

		// Identifies the type of streamer
		const type = TStreamer.identifyStreamer(basicInfo.broadcaster_type);

		// Fetches the number of followers
		const followers = await TwitchAPI.fetchFollowers(basicInfo.id);

		// Fetches the streams of the streamer
		const streams = await TwitchAPI.fetchStreams(basicInfo.id);

		res.send(
			new Streamer(
				basicInfo.id,
				basicInfo.display_name,
				basicInfo.profile_image_url,
				createdAt,
				type,
				followers,
				basicInfo.view_count,
				streams
			)
		);

		// Logs the query
		DiscordAPI.logValidQuery(req.query.url);
	}
}

export default new TwitchController();

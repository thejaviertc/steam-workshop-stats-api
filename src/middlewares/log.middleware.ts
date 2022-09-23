import DiscordAPI from "../services/DiscordAPI.js";

/**
 * Logs every GET/POST of the website in my Discord Server
 * @param req
 * @param res
 * @param next
 */
export default function logMiddleware(req, res, next) {
	DiscordAPI.logQuery(req.url);
	next();
}

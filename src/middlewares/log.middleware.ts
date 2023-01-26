import DiscordService from "../services/DiscordService.js";

/**
 * Logs every GET/POST of the website in my Discord Server
 * @param req
 * @param res
 * @param next
 */
export default function logMiddleware(req, res, next) {
	DiscordService.logRoute(req);
	next();
}

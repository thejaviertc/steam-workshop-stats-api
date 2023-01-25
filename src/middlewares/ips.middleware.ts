import DiscordAPI from "../services/DiscordAPI.js";
import mongoDb from "../services/MongoDB.js";

let ipCounter = [];

setInterval(() => {
	ipCounter = [];
}, 1000 * 60 * 5);

export default async function ipsMiddleware(req, res, next) {
	let userIp = req.headers["x-forwarded-for"];

	// Gets the IP of the user
	if (userIp) {
		var list = userIp.split(",");
		userIp = list[list.length - 1];
	} else userIp = req.connection.remoteAddress;

	// Checks if the ip is inside the database
	if (await mongoDb.isIpInDatabase(userIp)) {
		DiscordAPI.logBannedIp(userIp);
		res.status(503).send({ message: "You sent too many requests." });
	} else {
		let searchIndex = ipCounter.findIndex((ip) => ip.ip === userIp);

		if (searchIndex === -1) {
			ipCounter.push({ ip: userIp, count: 1 });
			next();
		} else {
			ipCounter[searchIndex].count += 1;

			// Ip the IP reaches the limit, adds it to the database
			if (ipCounter[searchIndex].count >= 15) {
				mongoDb.addIp(userIp);
				DiscordAPI.logBannedIp(userIp);
				res.status(503).send({
					message: "You sent too many requests.",
				});
			} else {
				next();
			}
		}
	}
}

import { NextFunction, Request, Response } from "express";
import DatabaseService from "../services/DatabaseService.js";
import DiscordService from "../services/DiscordService.js";
import IpUtils from "../utils/IpUtils.js";

const ipUtils = new IpUtils();

export default async function ipsMiddleware(req: Request, res: Response, next: NextFunction) {
	const userIp = IpUtils.getIpFromRequest(req);

	if (await DatabaseService.isIpInDatabase(userIp)) {
		DiscordService.logBan(req);
		return res.status(503).send({ message: "You sent too many requests." });
	}

	if (ipUtils.hasReachedLimit(userIp)) {
		DatabaseService.addIp(userIp);
		DiscordService.logBan(req);
		return res.status(503).send({
			message: "You sent too many requests.",
		});
	}

	next();
}

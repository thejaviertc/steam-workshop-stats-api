import { Request } from "express";

export default class IpUtils {
	/**
	 * Returns the IP of the user that made the request
	 */
	public static getIpFromRequest(req: Request): string {
		let ips =
			req.headers["cf-connecting-ip"] ??
			req.headers["x-real-ip"] ??
			req.headers["x-forwarded-for"] ??
			req.socket.remoteAddress ??
			"";

		if (typeof ips === "string") {
			ips = ips.split(",");
		}

		if (Array.isArray(ips)) {
			return ips[0].trim();
		}

		return ips;
	}
}

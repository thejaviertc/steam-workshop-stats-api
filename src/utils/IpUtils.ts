class IpUtils {
	/**
	 * Returns the IP of the user that made the request
	 * @param req
	 * @returns string
	 */
	public static getIpFromRequest(req): string {
		const ips = (
			req.headers["cf-connecting-ip"] ||
			req.headers["x-real-ip"] ||
			req.headers["x-forwarded-for"] ||
			req.connection.remoteAddress || ""
		).split(",");

		return ips[0].trim();
	}
}

export default IpUtils;
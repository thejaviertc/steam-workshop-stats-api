import IIpUtils from "./IIpUtils";

class IpUtils implements IIpUtils {
	private ips: { value: string; count: number }[];

	public constructor() {
		this.ips = [];
		this.initialize();
	}

	/**
	 * Initializes the loop and cleans the array of IPs each 5 minutes
	 */
	private async initialize() {
		setInterval(() => {
			this.ips = [];
		}, 1000 * 60 * 5);
	}

	/**
	 * Adds an IP to the array and initializes the counter
	 * @param ip string
	 */
	private addIp(ip: string) {
		this.ips.push({ value: ip, count: 1 });
	}

	/**
	 * Returns the position of the IP inside the array (-1 if not founded)
	 * @param value string
	 * @returns number
	 */
	private hasIp(value: string): number {
		return this.ips.findIndex((ip) => ip.value === value);
	}

	/**
	 * Checks if the IP has reached the limit of 100 petitions in less than 5 minutes
	 * @param ip string
	 * @returns boolean
	 */
	public hasReachedLimit(ip: string): boolean {
		const position = this.hasIp(ip);

		if (position === -1) {
			this.addIp(ip);
			return false;
		}

		return ++this.ips[position].count >= 100;
	}

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
			req.connection.remoteAddress ||
			""
		).split(",");

		return ips[0].trim();
	}
}

export default IpUtils;

import DatabaseService from "../services/DatabaseService.js";
import DiscordService from "../services/DiscordService.js";
import IpUtils from "../utils/IpUtils.js";

class IpsMiddleware {
	private bannedIps: string[];
	private actualIpList: { value: string; count: number }[];

	public constructor() {
		this.bannedIps = [];
		this.actualIpList = [];
		this.processQuery = this.processQuery.bind(this);
	}

	/**
	 * Initializes the middleware
	 */
	public async initialize() {
		this.bannedIps = await DatabaseService.getBannedIps();

		setInterval(() => {
			this.actualIpList = [];
		}, 1000 * 60 * 5);
	}

	/**
	 * Adds an IP to the actual ip list and initializes the counter
	 * @param ip string
	 */
	private addIp(ip: string) {
		this.actualIpList.push({ value: ip, count: 1 });
	}

	/**
	 * Returns the position of the IP inside the array
	 * @param value string
	 * @returns number (-1 if not found)
	 */
	private hasIp(value: string): number {
		return this.actualIpList.findIndex((ip) => ip.value === value);
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

		return ++this.actualIpList[position].count >= 100;
	}

	/**
	 * Process each query, checking if the ip has reached the limit of request
	 * @param req
	 * @param res
	 * @param next
	 * @returns
	 */
	public async processQuery(req, res, next) {
		const ip = IpUtils.getIpFromRequest(req);

		if (this.bannedIps.includes(ip)) {
			DiscordService.logBan(req);
			return res.status(503).send({ message: "You sent too many requests." });
		}

		if (this.hasReachedLimit(ip)) {
			DatabaseService.insertBannedIp(ip);
			DiscordService.logBan(req);
			return res.status(503).send({ message: "You sent too many requests." });
		}

		next();
	}
}

export default new IpsMiddleware();

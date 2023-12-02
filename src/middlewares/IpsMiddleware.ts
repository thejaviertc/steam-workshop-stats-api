import { NextFunction, Request, Response } from "express";
import DatabaseService from "../services/DatabaseService.js";
import DiscordService from "../services/DiscordService.js";
import IpUtils from "../utils/IpUtils.js";
import IMiddleware from "./IMiddleware.js";

class IpsMiddleware implements IMiddleware {
	private bannedIps: string[];
	private actualIpList: { value: string; count: number }[];

	public constructor() {
		this.bannedIps = [];
		this.actualIpList = [];
	}

	/**
	 * Initializes the middleware
	 */
	public async initialize() {
		this.bannedIps = await DatabaseService.getBannedIps();

		setInterval(
			() => {
				this.actualIpList = [];
			},
			1000 * 60 * 5,
		);
	}

	/**
	 * Adds an IP to the actual ip list and initializes the counter
	 */
	private addIp(ip: string) {
		this.actualIpList.push({ value: ip, count: 1 });
	}

	/**
	 * Checks if the IP exists inside the list and returns it's position
	 * @returns The position of the IP (-1 if not found)
	 */
	private hasIp(value: string): number {
		return this.actualIpList.findIndex((ip) => ip.value === value);
	}

	/**
	 * Checks if the IP has reached the limit of 100 petitions in less than 5 minutes
	 */
	public hasReachedLimit(ip: string): boolean {
		const position = this.hasIp(ip);

		if (position === -1) {
			this.addIp(ip);
			return false;
		}

		this.actualIpList[position].count++;

		return this.actualIpList[position].count >= 100;
	}

	/**
	 * Checks if the IP has reached the limit of request
	 */
	public async execute(req: Request, res: Response, next: NextFunction) {
		const ip = IpUtils.getIpFromRequest(req);

		if (this.bannedIps.includes(ip)) {
			res.status(403).send({ message: "You sent too many requests." });
		}

		if (this.hasReachedLimit(ip)) {
			await DatabaseService.insertBannedIp(ip);
			DiscordService.logBan(ip);
			res.status(403).send({ message: "You sent too many requests." });
		}

		next();
	}
}

const ipsMiddleware = new IpsMiddleware();
await ipsMiddleware.initialize();

export default ipsMiddleware;

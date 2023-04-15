import axios from "axios";
import IpUtils from "../utils/IpUtils.js";
import IDiscordService from "./IDiscordService.js";
import { Request } from "express";

class DiscordService implements IDiscordService {
	/**
	 * Logs the access to any route of the API in Discord
	 * @param req
	 */
	public async logRoute(req: Request) {
		const route = req.url;
		const ip = IpUtils.getIpFromRequest(req);

		axios({
			method: "POST",
			url: process.env.DISCORD_WEBHOOK_LOGS,
			headers: { "Content-Type": "application/json" },
			data: JSON.stringify({
				embeds: [
					{
						title: "Route Access",
						color: 10070709,
						type: "rich",
						fields: [
							{ name: "Route", value: route, inline: false },
							{ name: "User IP", value: ip, inline: false },
						],
						timestamp: new Date(),
					},
				],
			}),
		});
	}

	/**
	 * Logs the query of a user in Discord
	 * @param req
	 * @param invalidReason string
	 */
	public async logQuery(req: Request, invalidReason?: string) {
		const value = req.query.url;
		const ip = IpUtils.getIpFromRequest(req);

		const embed = {
			title: invalidReason ? "Invalid Query" : "Valid Query",
			color: invalidReason ? 15548997 : 5763719,
			type: "rich",
			fields: [
				{ name: "Value", value: value, inline: false },
				{ name: "User IP", value: ip, inline: false },
			],
			timestamp: new Date(),
		};

		if (invalidReason) {
			embed.fields.push({ name: "Reason", value: invalidReason, inline: false });
		}

		axios({
			method: "POST",
			url: process.env.DISCORD_WEBHOOK_LOGS,
			headers: { "Content-Type": "application/json" },
			data: JSON.stringify({
				embeds: [embed],
			}),
		});
	}

	/**
	 * Logs the banned ip in Discord
	 * @param ip string
	 */
	public async logBan(req: Request) {
		const ip = IpUtils.getIpFromRequest(req);

		axios({
			method: "POST",
			url: process.env.DISCORD_WEBHOOK_BANS,
			headers: { "Content-Type": "application/json" },
			data: JSON.stringify({
				embeds: [
					{
						title: "New IP Banned",
						color: 15548997,
						type: "rich",
						fields: [{ name: "IP", value: ip, inline: false }],
						timestamp: new Date(),
					},
				],
			}),
		});
	}

	public async logError(error: Error) {
		axios({
			method: "POST",
			url: process.env.DISCORD_WEBHOOK_ERRORS,
			headers: { "Content-Type": "application/json" },
			data: JSON.stringify({
				embeds: [
					{
						color: 15548997,
						type: "rich",
						fields: [{ name: "Error", value: error.message }],
						timestamp: new Date(),
					},
				],
			}),
		});
	}
}

export default new DiscordService();

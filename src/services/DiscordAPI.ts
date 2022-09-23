import axios from "axios";

/**
 * Class for using the Discord API
 */
class DiscordAPI {
	/**
	 * Logs the query in Discord
	 * @param url string
	 */
	public logQuery(url: string) {
		const embed = {
			title: "Query Logger",
			color: 10070709,
			type: "rich",
			fields: [{ name: "Route", value: url, inline: false }],
			timestamp: new Date(),
		};

		// Sends the embed to the discord server
		axios({
			method: "POST",
			url: process.env.DISCORD_WEBHOOK_LOG,
			headers: { "Content-Type": "application/json" },
			data: JSON.stringify({ embeds: [embed] }),
		});
	}

	/**
	 * Logs the valid query in Discord
	 * @param url string
	 */
	public logValidQuery(url: string) {
		let embed;

		if (url.includes("steam")) {
			embed = {
				title: "Javiertc's API",
				color: 36095,
				type: "rich",
				fields: [
					{ name: "Type", value: "Steam", inline: false },
					{
						name: "Steam Profile",
						value: url,
						inline: false,
					},
				],
				timestamp: new Date(),
			};
		}

		// Sends the embed to the discord server
		axios({
			method: "POST",
			url: process.env.DISCORD_WEBHOOK_VALID,
			headers: { "Content-Type": "application/json" },
			data: JSON.stringify({ embeds: [embed] }),
		});
	}

	/**
	 * Logs the banned ip in Discord
	 * @param ip string
	 */
	public logBannedIp(ip) {
		const embed = {
			title: "Banned IP Logger",
			color: 16711680,
			type: "rich",
			fields: [{ name: "IP", value: ip, inline: false }],
			timestamp: new Date(),
		};

		// Sends the embed to the discord server
		axios({
			method: "POST",
			url: process.env.DISCORD_WEBHOOK_BANNED,
			headers: { "Content-Type": "application/json" },
			data: JSON.stringify({ embeds: [embed] }),
		});
	}
}

export default new DiscordAPI();

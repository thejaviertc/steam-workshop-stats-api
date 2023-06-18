import pg from "pg";
import IDatabaseService from "./IDatabaseService.js";
import DiscordService from "./DiscordService.js";

const { Pool } = pg;

class DatabaseService implements IDatabaseService {
	private readonly database;

	public constructor() {
		this.database = new Pool({
			user: process.env.DATABASE_USERNAME,
			host: process.env.DATABASE_HOST,
			database: process.env.DATABASE_NAME,
			password: process.env.DATABASE_PASSWORD,
			port: Number(process.env.DATABASE_PORT),
			ssl: {
				rejectUnauthorized: false,
			},
		});
	}

	/**
	 * Obtains the banned ips from the database
	 * @returns string[]
	 */
	public async getBannedIps(): Promise<string[]> {
		const result = await this.database.query("SELECT ip FROM banned_ip");
		const bannedIps: string[] = [];

		for (const row of result.rows) {
			bannedIps.push(row.ip);
		}

		return bannedIps;
	}

	/**
	 * Inserts the banned IP in the database
	 * @param ip string
	 */
	public async insertBannedIp(ip: string) {
		await this.database.query("INSERT INTO banned_ip (ip) VALUES ($1)", [ip]);
	}
}

export default new DatabaseService();

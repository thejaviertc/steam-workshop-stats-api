import pg from "pg";
import IDatabaseService from "./IDatabaseService.js";

const { Pool } = pg;

class DatabaseService implements IDatabaseService {
	private readonly database;

	public constructor() {
		this.database = new Pool({
			user: process.env.DATABASE_USERNAME,
			host: process.env.DATABASE_HOST,
			database: process.env.DATABASE_NAME,
			password: process.env.DATABASE_PASSWORD,
			port: process.env.DATABASE_PORT,
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
		try {
			return await this.database.db("bannedIps").collection("bannedIps").distinct("ip");
		} catch (error) {
			console.log(error);
			return [];
		}
	}

	/**
	 * Inserts the banned IP in the database
	 * @param ip string
	 */
	public async insertBannedIp(ip: string) {
		this.database.db("bannedIps").collection("bannedIps").insertOne({ ip: ip });
	}
}

export default new DatabaseService();

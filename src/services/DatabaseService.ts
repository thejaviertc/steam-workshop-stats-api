import pg from "pg";
const { Pool } = pg;
import IDatabaseService from "./IDatabaseService";

class DatabaseService implements IDatabaseService {
	private database;

	public constructor() {
		this.database = new Pool({
			user: process.env.DATABASE_USERNAME,
			host: process.env.DATABASE_HOST,
			database: process.env.DATABASE_NAME,
			password: process.env.DATABASE_PASSWORD,
			port: process.env.DATABASE_PORT,
			ssl: {
				rejectUnauthorized: false,
			}
		});
	}

	/**
	 * Obtains the banned ips from the database
	 * @returns string[]
	 */
	public async getBannedIps(): Promise<string[]> {
		try {
			const result = await this.database.query("SELECT ip FROM banned_ip");

			const bannedIps = [];

			result.rows.forEach(value => {
				bannedIps.push(value.ip);
			});

			return bannedIps;
		} catch (error) {
			console.log(error);
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

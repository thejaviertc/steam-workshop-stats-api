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

	public async test() {
		try {
			const results = await this.database.query("SELECT NOW()");
			console.log(results);
		} catch (err) {
			console.error("error executing query:", err);
		}
	}

	/**
	 * Checks if the IP is inside the database
	 * @param ip string
	 * @returns boolean
	 */
	public async isIpInDatabase(ip: string): Promise<boolean> {
		return (
			(await this.database
				.db("bannedIps")
				.collection("bannedIps")
				.findOne({ ip: ip })) != null
		);
	}

	/**
	 * Adds the IP to the database
	 * @param ip string
	 */
	public async addIp(ip: string) {
		this.database.db("bannedIps").collection("bannedIps").insertOne({ ip: ip });
	}
}

export default new DatabaseService();

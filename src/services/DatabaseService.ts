import { MongoClient } from "mongodb";
import IDatabaseService from "./IDatabaseService.js";

class DatabaseService implements IDatabaseService {
	private database: MongoClient;

	public constructor() {
		this.database = new MongoClient(process.env.MONGO_URL as string);
		this.database.connect();
	}

	/**
	 * Checks if the IP is inside the database
	 * @param ip string
	 * @returns boolean
	 */
	public async isIpInDatabase(ip: string): Promise<boolean> {
		return (
			(await this.database.db("bannedIps").collection("bannedIps").findOne({ ip: ip })) !=
			null
		);
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

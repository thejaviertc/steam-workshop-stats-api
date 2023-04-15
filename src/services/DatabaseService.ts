import { MongoClient } from "mongodb";
import IDatabaseService from "./IDatabaseService.js";

class DatabaseService implements IDatabaseService {
	private readonly database: MongoClient;

	public constructor() {
		this.database = new MongoClient(process.env.MONGO_URL as string);
		this.database.connect();
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

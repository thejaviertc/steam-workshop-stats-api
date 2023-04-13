import { MongoClient } from "mongodb";
import IDatabaseService from "./IDatabaseService";

class DatabaseService implements IDatabaseService {
	private database: MongoClient;

	public constructor() {
		this.database = new MongoClient(process.env.MONGO_URL);
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
	 * Adds the IP to the database
	 * @param ip string
	 */
	public async addIp(ip: string) {
		this.database.db("bannedIps").collection("bannedIps").insertOne({ ip: ip });
	}
}

export default new DatabaseService();

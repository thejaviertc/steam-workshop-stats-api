import { MongoClient } from "mongodb";

const database = new MongoClient(process.env.MONGO_URL);
database.connect();

/**
 * Class for Mongo DB connections
 */
class MongoDB {
	/**
	 * Checks if the IP is inside the database
	 * @param ip string
	 * @returns boolean
	 */
	public async isIpInDatabase(ip: string): Promise<boolean> {
		return (
			(await database
				.db("bannedIps")
				.collection("bannedIps")
				.findOne({ ip: ip })) != null
		);
	}

	/**
	 * Adds the IP to the database
	 * @param ip string
	 */
	public addIp(ip: string) {
		database.db("bannedIps").collection("bannedIps").insertOne({ ip: ip });
	}
}

export default new MongoDB();

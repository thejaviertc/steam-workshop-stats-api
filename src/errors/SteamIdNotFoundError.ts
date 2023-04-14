import CustomError from "./CustomError.js";

export default class SteamIdNotFoundError extends CustomError {
	public httpCode = 500;
	public message = "Steam API fetching SteamID failed!";

	constructor() {
		super();
		Object.setPrototypeOf(this, SteamIdNotFoundError.prototype);
	}
}

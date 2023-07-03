import CustomError from "./CustomError.js";

export default class SteamIdNotFoundError extends CustomError {
	public message = "Steam API fetching SteamID failed!";
	public httpCode = 500;

	constructor() {
		super();
		Object.setPrototypeOf(this, SteamIdNotFoundError.prototype);
	}
}

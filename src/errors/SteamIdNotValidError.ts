import CustomError from "./CustomError.js";

export default class SteamIdNotValidError extends CustomError {
	public httpCode = 400;
	public message = "This Steam ID is not valid!";

	constructor() {
		super();
		Object.setPrototypeOf(this, SteamIdNotValidError.prototype);
	}
}

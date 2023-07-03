import CustomError from "./CustomError.js";

export default class SteamIdNotValidError extends CustomError {
	public message = "This Steam ID is not valid!";
	public httpCode = 400;

	constructor() {
		super();
		Object.setPrototypeOf(this, SteamIdNotValidError.prototype);
	}
}

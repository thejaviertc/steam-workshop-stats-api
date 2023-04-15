import CustomError from "./CustomError.js";

export default class BasicInfoNotFoundError extends CustomError {
	public httpCode = 500;
	public message = "Steam API fetching basic info failed!";

	constructor() {
		super();
		Object.setPrototypeOf(this, BasicInfoNotFoundError.prototype);
	}
}

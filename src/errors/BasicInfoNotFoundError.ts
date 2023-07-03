import CustomError from "./CustomError.js";

export default class BasicInfoNotFoundError extends CustomError {
	public message = "Steam API fetching basic info failed!";
	public httpCode = 500;

	constructor() {
		super();
		Object.setPrototypeOf(this, BasicInfoNotFoundError.prototype);
	}
}

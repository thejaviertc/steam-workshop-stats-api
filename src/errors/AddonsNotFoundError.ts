import CustomError from "./CustomError.js";

export default class AddonsNotFoundError extends CustomError {
	public message = "Steam API fetching addon info failed! (Probably this user doesn't exists)";
	public httpCode = 500;

	constructor() {
		super();
		Object.setPrototypeOf(this, AddonsNotFoundError.prototype);
	}
}

import CustomError from "./CustomError.js";

export default class UrlNotValidError extends CustomError {
	public httpCode = 400;
	public message = "This URL is not valid!";

	constructor() {
		super();
		Object.setPrototypeOf(this, UrlNotValidError.prototype);
	}
}

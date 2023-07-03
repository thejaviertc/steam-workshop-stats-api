import CustomError from "./CustomError.js";

export default class ProfileIdNotValidError extends CustomError {
	public message = "This Profile ID is not valid!";
	public httpCode = 400;

	constructor() {
		super();
		Object.setPrototypeOf(this, ProfileIdNotValidError.prototype);
	}
}

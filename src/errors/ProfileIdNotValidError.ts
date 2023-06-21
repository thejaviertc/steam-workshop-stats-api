import CustomError from "./CustomError.js";

export default class ProfileIdNotValidError extends CustomError {
	public httpCode = 400;
	public message = "This Profile ID is not valid!";

	constructor() {
		super();
		Object.setPrototypeOf(this, ProfileIdNotValidError.prototype);
	}
}

import CustomError from "./CustomError.js";

export default class UsernameNotFoundError extends CustomError {
	public httpCode = 400;
	public message = "This username doesn't exists!";

	constructor() {
		super();
		Object.setPrototypeOf(this, UsernameNotFoundError.prototype);
	}
}

import CustomError from "./CustomError.js";

export default class UsernameNotFoundError extends CustomError {
	public message = "This username doesn't exists!";
	public httpCode = 400;

	constructor() {
		super();
		Object.setPrototypeOf(this, UsernameNotFoundError.prototype);
	}
}

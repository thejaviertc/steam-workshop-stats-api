class BasicInfoNotFoundError extends Error {
	__proto__ = Error;

	constructor() {
		super("Steam API fetching basic info failed!");
		Object.setPrototypeOf(this, BasicInfoNotFoundError.prototype);
	}
}

export default BasicInfoNotFoundError;
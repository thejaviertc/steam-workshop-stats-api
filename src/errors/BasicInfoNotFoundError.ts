class BasicInfoNotFoundError extends Error {
	__proto__ = Error;
	public httpCode: number;

	constructor() {
		super("Steam API fetching basic info failed!");
		Object.setPrototypeOf(this, BasicInfoNotFoundError.prototype);
		this.httpCode = 500;
	}
}

export default BasicInfoNotFoundError;
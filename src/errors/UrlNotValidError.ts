class UrlNotValidError extends Error {
	__proto__ = Error;
	public httpCode: number;

	constructor() {
		super("This URL is not valid!");
		Object.setPrototypeOf(this, UrlNotValidError.prototype);
		this.httpCode = 400;
	}
}

export default UrlNotValidError;

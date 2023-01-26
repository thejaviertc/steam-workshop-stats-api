class AddonsNotFoundError extends Error {
	__proto__ = Error;
	public httpCode: number;

	constructor() {
		super("Steam API fetching addon info failed! (Probably this user doesn't exists)");
		Object.setPrototypeOf(this, AddonsNotFoundError.prototype);
		this.httpCode = 500;
	}
}

export default AddonsNotFoundError;
class AddonsNotFoundError extends Error {
	__proto__ = Error;

	constructor() {
		super("Steam API fetching addon info failed!");
		Object.setPrototypeOf(this, AddonsNotFoundError.prototype);
	}
}

export default AddonsNotFoundError;
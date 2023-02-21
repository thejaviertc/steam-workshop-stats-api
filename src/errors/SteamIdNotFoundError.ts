class SteamIdNotFoundError extends Error {
	__proto__ = Error;
	public httpCode: number;

	constructor() {
		super("Steam API fetching SteamID failed!");
		Object.setPrototypeOf(this, SteamIdNotFoundError.prototype);
		this.httpCode = 500;
	}
}

export default SteamIdNotFoundError;

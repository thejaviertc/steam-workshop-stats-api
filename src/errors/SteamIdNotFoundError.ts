class SteamIdNotFoundError extends Error {
	__proto__ = Error;

	constructor() {
		super("Steam API fetching SteamID failed!");
		Object.setPrototypeOf(this, SteamIdNotFoundError.prototype);
	}
}

export default SteamIdNotFoundError;
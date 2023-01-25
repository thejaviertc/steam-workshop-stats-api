class UsernameNotFoundError extends Error {
	__proto__ = Error;

	constructor() {
		super("This username doesn't exists!");
		Object.setPrototypeOf(this, UsernameNotFoundError.prototype);
	}
}

export default UsernameNotFoundError;
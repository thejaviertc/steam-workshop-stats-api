class UsernameNotFoundError extends Error {
	__proto__ = Error;
	public httpCode: number;

	constructor() {
		super("This username doesn't exists!");
		Object.setPrototypeOf(this, UsernameNotFoundError.prototype);
		this.httpCode = 400;
	}
}

export default UsernameNotFoundError;

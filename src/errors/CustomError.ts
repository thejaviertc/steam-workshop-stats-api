export default abstract class CustomError extends Error {
	public abstract message: string;
	public abstract httpCode: number;

	constructor() {
		super();
		Object.setPrototypeOf(this, CustomError.prototype);
	}
}

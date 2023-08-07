import UsernameNotFoundError from "./UsernameNotFoundError.js";

describe("UsernameNotFoundError", () => {
	test("Creates a new object", () => {
		const usernameNotFoundError = new UsernameNotFoundError();
		expect(usernameNotFoundError).toBeInstanceOf(UsernameNotFoundError);
		expect(usernameNotFoundError.message).toContain("doesn't exists");
		expect(usernameNotFoundError.httpCode).toBe(400);
	});
});

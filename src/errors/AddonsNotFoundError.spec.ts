import AddonsNotFoundError from "./AddonsNotFoundError.js";

describe("AddonsNotFoundError", () => {
	test("Creates a new object", () => {
		const addonsNotFoundError = new AddonsNotFoundError();
		expect(addonsNotFoundError).toBeInstanceOf(AddonsNotFoundError);
		expect(addonsNotFoundError.message).toContain("doesn't exists");
		expect(addonsNotFoundError.httpCode).toBe(500);
	});
});

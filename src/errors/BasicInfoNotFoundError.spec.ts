import BasicInfoNotFoundError from "./BasicInfoNotFoundError.js";

describe("BasicInfoNotFoundError", () => {
	test("Creates a new object", () => {
		const basicInfoNotFoundError = new BasicInfoNotFoundError();
		expect(basicInfoNotFoundError).toBeInstanceOf(BasicInfoNotFoundError);
		expect(basicInfoNotFoundError.message).toContain("failed");
		expect(basicInfoNotFoundError.httpCode).toBe(500);
	});
});

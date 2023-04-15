import UrlNotValidError from "../../../errors/UrlNotValidError.js";

describe("UrlNotValidError", () => {
	test("Creates a new object", () => {
		const urlNotValidError = new UrlNotValidError();
		expect(urlNotValidError).toBeInstanceOf(UrlNotValidError);
		expect(urlNotValidError.message).toContain("not valid");
		expect(urlNotValidError.httpCode).toBe(400);
	});
});

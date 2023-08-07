import SteamIdNotValidError from "./SteamIdNotValidError.js";

describe("UrlNotValidError", () => {
	test("Creates a new object", () => {
		const steamIdNotValidError = new SteamIdNotValidError();
		expect(steamIdNotValidError).toBeInstanceOf(SteamIdNotValidError);
		expect(steamIdNotValidError.message).toContain("not valid");
		expect(steamIdNotValidError.httpCode).toBe(400);
	});
});

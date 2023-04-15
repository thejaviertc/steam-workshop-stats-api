import SteamIdNotFoundError from "../../../errors/SteamIdNotFoundError.js";

describe("SteamIdNotFoundError", () => {
	test("Creates a new object", () => {
		const steamIdNotFoundError = new SteamIdNotFoundError();
		expect(steamIdNotFoundError).toBeInstanceOf(SteamIdNotFoundError);
		expect(steamIdNotFoundError.message).toContain("failed");
		expect(steamIdNotFoundError.httpCode).toBe(500);
	});
});

import SteamIdNotValidError from "./SteamIdNotValidError.js";
import { describe, expect, it } from "vitest";

describe("UrlNotValidError", () => {
	it("Creates a new object", () => {
		const steamIdNotValidError = new SteamIdNotValidError();
		expect(steamIdNotValidError).toBeInstanceOf(SteamIdNotValidError);
		expect(steamIdNotValidError.message).toContain("not valid");
		expect(steamIdNotValidError.httpCode).toBe(400);
	});
});

import { describe, expect, it } from "vitest";
import SteamIdNotFoundError from "./SteamIdNotFoundError.js";

describe("SteamIdNotFoundError", () => {
	it("Creates a new object", () => {
		const steamIdNotFoundError = new SteamIdNotFoundError();
		expect(steamIdNotFoundError).toBeInstanceOf(SteamIdNotFoundError);
		expect(steamIdNotFoundError.message).toContain("failed");
		expect(steamIdNotFoundError.httpCode).toBe(500);
	});
});

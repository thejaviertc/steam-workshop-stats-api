import { describe, expect, it } from "vitest";
import ProfileIdNotValidError from "./ProfileIdNotValidError.js";

describe("UrlNotValidError", () => {
	it("Creates a new object", () => {
		const profileIdNotValidError = new ProfileIdNotValidError();
		expect(profileIdNotValidError).toBeInstanceOf(ProfileIdNotValidError);
		expect(profileIdNotValidError.message).toContain("not valid");
		expect(profileIdNotValidError.httpCode).toBe(400);
	});
});

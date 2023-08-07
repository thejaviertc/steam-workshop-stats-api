import ProfileIdNotValidError from "./ProfileIdNotValidError.js";

describe("UrlNotValidError", () => {
	test("Creates a new object", () => {
		const profileIdNotValidError = new ProfileIdNotValidError();
		expect(profileIdNotValidError).toBeInstanceOf(ProfileIdNotValidError);
		expect(profileIdNotValidError.message).toContain("not valid");
		expect(profileIdNotValidError.httpCode).toBe(400);
	});
});

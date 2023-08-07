import { describe, expect, it } from "vitest";
import UsernameNotFoundError from "./UsernameNotFoundError.js";

describe("UsernameNotFoundError", () => {
	it("Creates a new object", () => {
		const usernameNotFoundError = new UsernameNotFoundError();
		expect(usernameNotFoundError).toBeInstanceOf(UsernameNotFoundError);
		expect(usernameNotFoundError.message).toContain("doesn't exists");
		expect(usernameNotFoundError.httpCode).toBe(400);
	});
});

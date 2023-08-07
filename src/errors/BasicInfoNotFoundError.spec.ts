import { describe, expect, it } from "vitest";
import BasicInfoNotFoundError from "./BasicInfoNotFoundError.js";

describe("BasicInfoNotFoundError", () => {
	it("Creates a new object", () => {
		const basicInfoNotFoundError = new BasicInfoNotFoundError();
		expect(basicInfoNotFoundError).toBeInstanceOf(BasicInfoNotFoundError);
		expect(basicInfoNotFoundError.message).toContain("failed");
		expect(basicInfoNotFoundError.httpCode).toBe(500);
	});
});

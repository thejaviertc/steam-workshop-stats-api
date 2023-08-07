import { describe, expect, it } from "vitest";
import Addon from "./Addon.js";

describe("Addon", () => {
	const addon = new Addon(1, "", "", 1, 2, 3, 4, 5, 1);

	it("Creates a new object", () => {
		expect(addon).toBeInstanceOf(Addon);
	});

	it(".getId() returns the Id", () => {
		expect(addon.getId()).toBe(1);
	});
});

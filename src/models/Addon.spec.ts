import Addon from "./Addon.js";

describe("Addon", () => {
	const addon = new Addon(1, "", "", 1, 2, 3, 4, 5, 1);

	test("Creates a new object", () => {
		expect(addon).toBeInstanceOf(Addon);
	});

	test(".getId() returns the Id", () => {
		expect(addon.getId()).toBe(1);
	});
});

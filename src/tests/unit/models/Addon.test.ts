import Addon from "../../../models/Addon.js";

describe("Addon", () => {
	const addon = new Addon(1, "", "", 1, 2, 3, 4, 5);

	test("Creates a new object", () => {
		expect(addon).toBeInstanceOf(Addon);
	});

	test(".getId() returns the Id", () => {
		expect(addon.getId()).toBe(1);
	});
});

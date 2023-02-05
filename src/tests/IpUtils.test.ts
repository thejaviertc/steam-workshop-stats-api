import IpUtils from "../utils/IpUtils.js";

describe("SteamUser", () => {
	const ipUtils = new IpUtils();

	test("Returns 'false' when the IP appears for the first time", () => {
		expect(
			ipUtils.hasReachedLimit("192.168.1.30")
		).toBeFalsy();
	});

	test("Returns 'true' when the IP appears reaches the limit", () => {
		for (let i = 0; i < 98; i++)
			ipUtils.hasReachedLimit("192.168.1.30");

		expect(
			ipUtils.hasReachedLimit("192.168.1.30")
		).toBeTruthy();
	});
});
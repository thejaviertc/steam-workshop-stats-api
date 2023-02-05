import IpUtils from "../utils/IpUtils.js";
jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

describe("SteamUser", () => {
	test("Returns 'false' when the IP appears for the first time", () => {
		const ipUtils = new IpUtils();

		expect(
			ipUtils.hasReachedLimit("192.168.1.30")
		).toBeFalsy();
	});

	test("Returns 'true' when the IP appears reaches the limit", () => {
		const ipUtils = new IpUtils();

		for (let i = 0; i < 99; i++)
			ipUtils.hasReachedLimit("192.168.1.30");

		expect(
			ipUtils.hasReachedLimit("192.168.1.30")
		).toBeTruthy();
	});
});
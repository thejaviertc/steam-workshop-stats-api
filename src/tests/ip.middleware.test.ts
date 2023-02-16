import IpsMiddleware from "../middlewares/ips.middleware";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

describe("IpsMiddleware", () => {
	test("Returns 'false' when the IP appears for the first time", () => {
		expect(
			IpsMiddleware.hasReachedLimit("192.168.1.30")
		).toBeFalsy();
	});

	test("Returns 'true' when the IP appears reaches the limit", () => {
		for (let i = 0; i < 99; i++)
			IpsMiddleware.hasReachedLimit("192.168.1.30");

		expect(
			IpsMiddleware.hasReachedLimit("192.168.1.30")
		).toBeTruthy();
	});
});
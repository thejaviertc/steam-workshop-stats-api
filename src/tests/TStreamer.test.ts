import TStreamer from "../models/TStreamer";

describe("TStreamer", () => {
	test("Identifies '' as 'Normal'", () => {
		expect(TStreamer.identifyStreamer("")).toBe(TStreamer.NORMAL);
	});

	test("Identifies 'affiliate' as 'Affiliate'", () => {
		expect(TStreamer.identifyStreamer("affiliate")).toBe(
			TStreamer.AFFILIATE
		);
	});

	test("Identifies 'partner' as 'Partner'", () => {
		expect(TStreamer.identifyStreamer("partner")).toBe(TStreamer.PARTNER);
	});

	test("Throws an Error identifying a random string", () => {
		expect(() => {
			TStreamer.identifyStreamer("tahegr");
		}).toThrow(Error);
	});
});

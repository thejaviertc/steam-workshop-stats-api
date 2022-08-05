import Streamer from "../models/Streamer";

describe("Streamer", () => {
	test("Detects as valid a real streamer url", () => {
		expect(
			Streamer.isStreamerUrlValid("https://www.twitch.tv/ibai")
		).toBeTruthy();
	});

	test("Detects as invalid a random string", () => {
		expect(Streamer.isStreamerUrlValid("asdopfkaspokf")).toBeFalsy();
	});
});

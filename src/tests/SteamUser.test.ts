import SteamUser from "../models/SteamUser";

describe("SteamUser", () => {
	test("Detects as valid a real profile url with type 'id'", () => {
		expect(SteamUser.isProfileUrlValid("https://steamcommunity.com/id/javiertc")).toBeTruthy();
	});

	test("Detects as valid a real profile url with type 'profiles'", () => {
		expect(
			SteamUser.isProfileUrlValid("https://steamcommunity.com/profiles/76561198871941294")
		).toBeTruthy();
	});

	test("Detects as invalid a random string", () => {
		expect(SteamUser.isProfileUrlValid("asdopfkaspokf")).toBeFalsy();
	});

	test("Detects as invalid a string that is similar to a real one", () => {
		expect(
			SteamUser.isProfileUrlValid("http://steamcommunity.com/something/asdoas")
		).toBeFalsy();
	});
});

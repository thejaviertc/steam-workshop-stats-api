import SteamUser from "../models/SteamUser.js";

describe("SteamUser", () => {
	test("Creates a new object", () => {
		const steamUser = new SteamUser("", "", "", 1, 2, 3, 4, 5, []);
		expect(steamUser).toBeInstanceOf(SteamUser);
	});

	test("Detects as valid a real profile url with type 'id'", () => {
		expect(SteamUser.isProfileUrlValid("https://steamcommunity.com/id/javiertc")).toBeTruthy();
	});

	test("Detects as valid a real profile url with type 'id' and symbols", () => {
		expect(
			SteamUser.isProfileUrlValid("https://steamcommunity.com/id/Chuckleberry_Finn")
		).toBeTruthy();
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

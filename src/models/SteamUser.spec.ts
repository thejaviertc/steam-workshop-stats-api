import SteamUser from "./SteamUser.js";

describe("SteamUser", () => {
	test("Creates a new object", () => {
		const steamUser = new SteamUser("", "", "", 1, 2, 3, 4, 5, []);
		expect(steamUser).toBeInstanceOf(SteamUser);
	});

	test("Detects as valid a real Profile ID", () => {
		expect(SteamUser.isProfileIdValid("javiertc")).toBeTruthy();
	});

	test("Detects as valid a real Profile ID with symbols", () => {
		expect(SteamUser.isProfileIdValid("Chuckleberry_Finn")).toBeTruthy();
	});

	test("Detects as invalid ProfileID a random value", () => {
		expect(SteamUser.isProfileIdValid("^```")).toBeFalsy();
	});

	test("Detects as valid a real SteamID", () => {
		expect(SteamUser.isSteamIdValid("76561198871941294")).toBeTruthy();
	});

	test("Detects as invalid SteamID a random string", () => {
		expect(SteamUser.isSteamIdValid("asdopfkaspokf")).toBeFalsy();
	});
});

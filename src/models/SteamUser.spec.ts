import { describe, expect, it } from "vitest";
import SteamUser from "./SteamUser.js";

describe("SteamUser", () => {
	it("Creates a new object", () => {
		const steamUser = new SteamUser("", "", "", 1, 2, 3, 4, 5, []);
		expect(steamUser).toBeInstanceOf(SteamUser);
	});

	it("Detects as valid a real Profile ID", () => {
		expect(SteamUser.isProfileIdValid("javiertc")).toBeTruthy();
	});

	it("Detects as valid a real Profile ID with symbols", () => {
		expect(SteamUser.isProfileIdValid("Chuckleberry_Finn")).toBeTruthy();
	});

	it("Detects as invalid ProfileID a random value", () => {
		expect(SteamUser.isProfileIdValid("^```")).toBeFalsy();
	});

	it("Detects as valid a real SteamID", () => {
		expect(SteamUser.isSteamIdValid("76561198871941294")).toBeTruthy();
	});

	it("Detects as invalid SteamID a random string", () => {
		expect(SteamUser.isSteamIdValid("asdopfkaspokf")).toBeFalsy();
	});
});

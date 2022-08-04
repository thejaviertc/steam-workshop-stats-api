interface ISteamAPI {
	fetchSteamId(url: string): Promise<string>;
	fetchBasicInfo(steamId: string);
	fetchAddonsInfo(steamId: string);
}

export default ISteamAPI;

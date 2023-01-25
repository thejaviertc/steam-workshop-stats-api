interface ISteamService {
	fetchSteamId(id: string): Promise<string>;
	fetchBasicInfo(steamId: string);
	fetchAddonsInfo(steamId: string);
}

export default ISteamService;

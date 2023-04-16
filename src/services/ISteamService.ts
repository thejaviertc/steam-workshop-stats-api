interface ISteamService {
	fetchSteamId(id: string): Promise<string>;
	fetchBasicInfo(steamId: string): void;
	fetchAddonsInfo(steamId: string): void;
}

export default ISteamService;

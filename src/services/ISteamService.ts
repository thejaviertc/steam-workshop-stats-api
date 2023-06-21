interface ISteamService {
	getSteamIdFromProfileId(id: string): Promise<string>;
	getSteamUserBasicInfo(steamId: string): void;
	getAllSteamUserAddons(steamId: string): void;
}

export default ISteamService;

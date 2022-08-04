interface ITwitchAPI {
	getToken(): string;
	setToken(token: string);
	fetchBasicInfo(streamer: string);
	fetchFollowers(id: string);
	fetchStreams(id: string);
	// generateToken(id: string);
}

export default ITwitchAPI;

interface IDiscordService {
	logRoute(req);
	logQuery(req, invalidReason?: string);
	logBan(req);
}

export default IDiscordService;

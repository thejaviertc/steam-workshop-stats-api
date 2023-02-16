interface IDatabaseService {
	getBannedIps(): Promise<string[]>;
	insertBannedIp(ip: string);
}

export default IDatabaseService;

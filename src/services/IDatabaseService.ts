interface IDatabaseService {
	isIpInDatabase(ip: string): Promise<boolean>;
	insertBannedIp(ip: string): void;
}

export default IDatabaseService;

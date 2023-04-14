interface IDatabaseService {
	getBannedIps(): Promise<string[]>;
	insertBannedIp(ip: string): void;
}

export default IDatabaseService;

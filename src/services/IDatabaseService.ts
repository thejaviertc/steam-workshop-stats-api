interface IDatabaseService {
	isIpInDatabase(ip: string): Promise<boolean>;
	addIp(ip: string): void;
}

export default IDatabaseService;

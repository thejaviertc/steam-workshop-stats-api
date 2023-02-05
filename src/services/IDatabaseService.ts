interface IDatabaseService {
	isIpInDatabase(ip: string): Promise<boolean>;
	addIp(ip: string);
}

export default IDatabaseService;

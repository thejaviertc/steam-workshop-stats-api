import { Request } from "express";

interface IDiscordService {
	logRoute(req: Request): void;
	logQuery(req: Request, invalidReason?: string): void;
	logBan(ip: string): void;
	logUnhandledError(error: Error): void;
}

export default IDiscordService;

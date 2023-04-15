import { Request } from "express";

interface IDiscordService {
	logRoute(req: Request): void;
	logQuery(req: Request, invalidReason?: string): void;
	logBan(req: Request): void;
}

export default IDiscordService;

import { rateLimit } from "express-rate-limit";

export default rateLimit({
	windowMs: 1 * 60 * 60 * 1000, // 1 hours
	max: 10,
	standardHeaders: false,
	legacyHeaders: false,
	handler: (req, res) => {
		return res.status(429).json({
			message:
				"You sent too many requests. Please wait a while then try again",
		});
	},
});

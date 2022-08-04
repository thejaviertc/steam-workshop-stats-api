import { rateLimit } from "express-rate-limit";

export default rateLimit({
	windowMs: 120 * 60 * 1000,
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

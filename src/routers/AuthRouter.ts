/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import passport from "passport";
import Router from "./Router.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

declare global {
	namespace Express {
		interface User {
			id: string;
			displayName: string;
		}
	}
}

class AuthRouter extends Router {
	public constructor() {
		super();

		this.router.get(
			"/",
			passport.authenticate("steam", { failureRedirect: "/" }),
			(_req, res) => {
				res.redirect("/");
			},
		);

		this.router.get(
			"/return",
			passport.authenticate("steam", { failureRedirect: "/" }),
			(_req, res) => {
				res.redirect("/");
			},
		);

		this.router.get("/me", AuthMiddleware, (req, res) => {
			if (req.user) {
				res.send({
					id: req.user.id,
					username: req.user.displayName,
				});
			} else {
				res.sendStatus(403);
			}
		});
	}
}

export default new AuthRouter().router;

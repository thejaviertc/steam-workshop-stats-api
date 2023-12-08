import passport from "passport";
import Router from "./Router.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

interface SteamUser {
	id: string;
	displayName: string;
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
			const user = req.user as SteamUser;

			if (user) {
				res.send({
					id: user.id,
					username: user.displayName,
				});
			} else {
				res.sendStatus(403);
			}
		});
	}
}

export default new AuthRouter().router;

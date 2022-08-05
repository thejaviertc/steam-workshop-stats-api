import request from "supertest";
import app from "../app";

describe("Steam Routes", () => {
	test("Valid GET /steam-workshop-stats", async () => {
		const res = await request(app)
			.get("/steam-workshop-stats")
			.query({ url: "https://steamcommunity.com/id/javiertc" });

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("steamId");
	});

	test("Invalid GET /steam-workshop-stats (Wrong URL)", async () => {
		const res = await request(app)
			.get("/steam-workshop-stats")
			.query({ url: "https://google.es" });

		expect(res.statusCode).toEqual(400);
		expect(res.body.message).toMatch(/URL is not valid/);
	});

	test("Invalid GET /steam-workshop-stats (Correct URL but nonexistent user)", async () => {
		const res = await request(app)
			.get("/steam-workshop-stats")
			.query({ url: "https://steamcommunity.com/profiles/761248512" });

		expect(res.statusCode).toEqual(400);
		expect(res.body.message).toMatch(/user doesn't exists/);
	});
});

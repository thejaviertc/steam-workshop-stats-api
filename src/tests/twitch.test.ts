import request from "supertest";
import app from "../app";

describe("Twitch Routes", () => {
	test("Valid GET /twitch-stats", async () => {
		const res = await request(app)
			.get("/twitch-stats")
			.query({ url: "https://www.twitch.tv/ibai" });

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("username");
	});

	test("Invalid GET /twitch-stats (Wrong URL)", async () => {
		const res = await request(app)
			.get("/steam-workshop-stats")
			.query({ url: "https://google.es" });

		expect(res.statusCode).toEqual(400);
		expect(res.body.message).toMatch(/URL is not valid/);
	});

	test("Invalid GET /twitch-stats (Correct URL but nonexistent streamer)", async () => {
		const res = await request(app)
			.get("/twitch-stats")
			.query({ url: "https://www.twitch.tv/gerqgpoqeagpqagrf" });

		expect(res.statusCode).toEqual(400);
		expect(res.body.message).toMatch(/streamer doesn't exists/);
	});
});

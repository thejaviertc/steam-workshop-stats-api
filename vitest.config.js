import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		reporters: "verbose",
		coverage: {
			all: true,
			include: ["src/**/*.{js,ts}"],
		},
	},
});

export default {
	roots: ["<rootDir>/src"],
	preset: "ts-jest",
	setupFiles: ["dotenv/config"],
	testEnvironment: "node",
	extensionsToTreatAsEsm: [".ts"],
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
	verbose: true,
	coverageProvider: "v8",
	collectCoverageFrom: ["src/**/*{js,jsx,ts,tsx}"],
};

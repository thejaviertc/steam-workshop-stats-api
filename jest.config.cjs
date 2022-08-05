/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	roots: ["<rootDir>/src"],
	preset: "ts-jest",
	setupFiles: ["dotenv/config"],
	testEnvironment: "node",
	verbose: true,
	extensionsToTreatAsEsm: [".ts"],
	globals: {
		"ts-jest": {
			useESM: true,
		},
	},
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
	collectCoverage: true,
	collectCoverageFrom: ["./src/**"],
};

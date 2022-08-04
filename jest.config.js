export default {
    roots: ["<rootDir>/src"],
    preset: "ts-jest",
    setupFiles: ['dotenv/config'],
    testEnvironment: "node",
    verbose: true,
    extensionsToTreatAsEsm: ['.ts'],
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
};

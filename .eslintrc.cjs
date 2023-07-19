module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"plugin:@typescript-eslint/recommended-type-checked",
		"plugin:@typescript-eslint/stylistic-type-checked",
		"prettier",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: true,
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "eslint-plugin-tsdoc"],
	rules: {
		indent: ["error", "tab", { SwitchCase: 1 }],
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
	},
};

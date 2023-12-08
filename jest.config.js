// jest.config.js
module.exports = {
	testMatch: ["**/*.test.js"],
	reporters: [
		"default",
		[
			"jest-html-reporter",
			{
				pageTitle: "Test Report",
				outputPath: "./tests/test-report.html",
				includeConsoleLog: true,
				includeSuiteFailure: true,
				testTimeout: 1000000,
			},
		],
	],
	// Các cấu hình khác của Jest nếu có
};

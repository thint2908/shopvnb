const { Builder } = require("selenium-webdriver");
const { runTest, By, until } = require("./test_script");

// Create a shared WebDriver instance outside of the test cases
const sharedDriver = new Builder().forBrowser("chrome").build();

// Close the shared driver after all tests are finished
afterAll(async () => {
	await sharedDriver.quit();
});

test("Input can receive text", async () => {
	await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
		// Lấy input đầu tiên có class "input-group-field"
		const inputElement = await driver.findElement(
			By.className("input-group-field")
		);

		// Kiểm tra xem input có hiển thị hay không
		const isInputDisplayed = await inputElement.isDisplayed();
		expect(isInputDisplayed).toBe(true);

		// Gửi thông tin vào input và kiểm tra xem có thành công hay không
		await inputElement.sendKeys("Test input");
		const inputValue = await inputElement.getAttribute("value");
		expect(inputValue).toBe("Test input");
	});
});

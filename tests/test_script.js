// const { Builder, By, Key, until } = require("selenium-webdriver");

// async function runTest() {
// 	let driver = await new Builder().forBrowser("chrome").build();
// 	try {
// 		// Mở trình duyệt và tải trang web của bạn
// 		await driver.get("http://127.0.0.1:5500/index.html");

// 		await driver.sleep(1000);

// 		// Thực hiện các thao tác kiểm thử
// 		await driver.wait(until.titleIs("Coron"), 1000);

// 		await driver.findElement(By.id("search-bar-test")).click();

// 		await driver.findElement(By.className("shopping_cart")).click();
// 		// await driver.findElement(By.id("search-bar-test")).sendKeys("Test input");

// 		// await driver.findElement(By.id("shop-btn-test")).click();

// 		// Chờ cho một số điều kiện hoặc sự kiện xảy ra

// 		// Log kết quả kiểm thử
// 		console.log("Test passed!");
// 	} finally {
// 		// Đóng trình duyệt sau khi kiểm thử hoàn tất
// 		await driver.quit();
// 	}
// }
// module.exports = runTest;
const { Builder, By, until } = require("selenium-webdriver");

async function runTest(driver, url, testFunction) {
	try {
		await driver.get(url);
		// await driver.sleep(3000);
		// Execute the provided test function
		await testFunction(driver);
	} finally {
		// Do not quit the driver here to keep the browser instance open
	}
}

module.exports = { runTest, By, until };

// // test_script.test.js
// const runTest = require("./test_script");

// test("Run test script", async () => {
// 	await runTest();
// });

const { Builder } = require("selenium-webdriver");
const { runTest, By, until } = require("./test_script");

// Create a shared WebDriver instance outside of the test cases
const sharedDriver = new Builder().forBrowser("chrome").build();

// Close the shared driver after all tests are finished
afterAll(async () => {
	await sharedDriver.quit();
});

// test("Page title should be 'Coron'", async () => {
// 	await runTest(
// 		sharedDriver,
// 		"http://127.0.0.1:5500/index.html",
// 		async (driver) => {
// 			await driver.wait(until.titleIs("Coron"), 2000);
// 		}
// 	);
// });

// test("Clicking on search bar should work", async () => {
// 	await runTest(
// 		sharedDriver,
// 		"http://127.0.0.1:5500/index.html",
// 		async (driver) => {
// 			await driver.findElement(By.id("search-bar-test")).click();
// 			// Add assertions or expectations here
// 		}
// 	);
// });

// test("Clicking on shopping cart should work", async () => {
// 	await runTest(
// 		sharedDriver,
// 		"http://127.0.0.1:5500/index.html",
// 		async (driver) => {
// 			await driver.findElement(By.className("shopping_cart")).click();
// 			// Add assertions or expectations here
// 		}
// 	);
// });

test("Clicking on https://shopvnb.com/ logo", async () => {
	await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
		await driver.findElement(By.className("logo-wrapper")).click();
		// Add assertions or expectations here
	});
});

test("Clicking on all 'nav-item' elements", async () => {
	await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
		// Lấy danh sách tất cả các thẻ li có class 'nav-item'
		const navItems = await driver.findElements(By.className("nav-item"));

		// Kiểm tra xem có đúng 9 thẻ 'nav-item' hay không
		expect(navItems.length).toBe(9);

		// Lặp qua từng thẻ và kiểm tra có thể click được hay không
		for (const navItem of navItems) {
			const isClickable = await isElementClickable(driver, navItem);
			expect(isClickable).toBe(true);
		}
	});
});
test("click cart icon navigation to cart page", async () => {
	await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
		await driver.sleep(1000);
		// const thirdLi = await driver.findElement(By.className("li-account"))[2];
		// const thirdLi = await driver.findElement(
		// 	By.xpath('(//a[@title="Đăng nhập"])')
		// );
		// await thirdLi.click();
		const loginLink = await driver.findElement(
			By.xpath('//a[@title="Giỏ hàng"]')
		);
		await loginLink.click();

		const afterClickUrl = await driver.getCurrentUrl();

		if (afterClickUrl === "https://shopvnb.com/gio-hang") {
			console.log("URL is correct after clicking on <a>");
		} else {
			console.log("URL is incorrect after clicking on <a>");
		}
	});
});
// Hàm kiểm tra xem một phần tử có thể click được hay không
async function isElementClickable(driver, element) {
	try {
		// Sử dụng phương thức click để kiểm tra
		await driver.executeScript("arguments[0].click();", element);
		return true;
	} catch (error) {
		// Nếu có lỗi, trả về false
		return false;
	}
}

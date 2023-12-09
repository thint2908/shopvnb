const { Builder } = require("selenium-webdriver");
const { runTest, By, until } = require("./test_script");

// Create a shared WebDriver instance outside of the test cases
const sharedDriver = new Builder().forBrowser("chrome").build();

// Close the shared driver after all tests are finished

test("Kiểm tra chuyển hướng trang đăng nhập", async () => {
	await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
		await driver.sleep(1000);
		const userIcon = await driver.findElement(
			By.xpath('//a[@title="Tài khoản"]')
		);
		await driver.wait(until.elementIsVisible(userIcon), 5000);

		await driver.actions().move({ origin: userIcon }).perform();
		const loginButton = await driver.findElement(
			By.xpath('//a[@title="Đăng nhập"]')
		);
		await driver.wait(until.elementIsVisible(loginButton), 5000);

		await loginButton.click();

		const currentUrl = await driver.getCurrentUrl();

		expect(currentUrl).toBe("https://shopvnb.com/thanh-vien/dang-nhap");
	});
}, 10000);

test("Kiểm tra chuyển hướng trang đăng ký", async () => {
	await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
		await driver.sleep(1000);
		const userIcon = await driver.findElement(
			By.xpath('//a[@title="Tài khoản"]')
		);
		await driver.wait(until.elementIsVisible(userIcon), 5000);

		await driver.actions().move({ origin: userIcon }).perform();
		const loginButton = await driver.findElement(
			By.xpath('//a[@title="Đăng ký"]')
		);
		await driver.wait(until.elementIsVisible(loginButton), 5000);

		await loginButton.click();

		const currentUrl = await driver.getCurrentUrl();

		expect(currentUrl).toBe("https://shopvnb.com/thanh-vien/dang-ky");
	});
});

test("Kiểm tra chuyển hướng trang tra cứu đơn hàng", async () => {
	await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
		await driver.sleep(1000);
		const userIcon = await driver.findElement(
			By.xpath('//a[@title="Kiểm tra đơn hàng / bảo hành"]')
		);
		await driver.wait(until.elementIsVisible(userIcon), 5000);

		await driver.actions().move({ origin: userIcon }).perform();
		const loginButton = await driver.findElement(
			By.xpath('//a[@title="Kiểm tra đơn hàng"]')
		);
		await driver.wait(until.elementIsVisible(loginButton), 5000);

		await loginButton.click();

		const currentUrl = await driver.getCurrentUrl();

		expect(currentUrl).toBe("https://shopvnb.com/kiem-tra-don-hang");
	});
});

test("Kiểm tra chuyển hướng trang tra cứu bảo hành", async () => {
	await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
		await driver.sleep(1000);
		const userIcon = await driver.findElement(
			By.xpath('//a[@title="Kiểm tra đơn hàng / bảo hành"]')
		);
		await driver.wait(until.elementIsVisible(userIcon), 5000);

		await driver.actions().move({ origin: userIcon }).perform();
		const loginButton = await driver.findElement(
			By.xpath('//a[@title="Kiểm tra bảo hành"]')
		);
		await driver.wait(until.elementIsVisible(loginButton), 5000);

		await loginButton.click();

		const currentUrl = await driver.getCurrentUrl();

		expect(currentUrl).toBe("https://shopvnb.com/kiem-tra-bao-hanh");
	});
});

test("Kiểm tra chuyển hướng trang đổi trả, hoàn tiền", async () => {
	await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
		await driver.sleep(1000);
		const element = await driver.findElement(
			By.xpath('//a[@href="chinh-sach-doi-tra-hoan-tien.html"]')
		);

		await element.click();

		const currentUrl = await driver.getCurrentUrl();

		expect(currentUrl).toBe(
			"https://shopvnb.com/chinh-sach-doi-tra-hoan-tien.html"
		);
	});
});

test("Kiểm tra chuyển hướng trang chính sách bảo hành", async () => {
	await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
		await driver.sleep(1000);
		const element = await driver.findElement(
			By.xpath('//a[@href="chinh-sach-bao-hanh.html"]')
		);

		await element.click();

		const currentUrl = await driver.getCurrentUrl();

		expect(currentUrl).toBe("https://shopvnb.com/chinh-sach-bao-hanh.html");
	});
});

test("Kiểm tra chuyển hướng trang xử lí khiếu nại", async () => {
	await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
		await driver.sleep(1000);
		const element = await driver.findElement(
			By.xpath('//a[@href="chinh-sach-xu-ly-khieu-nai.html"]')
		);

		await element.click();

		const currentUrl = await driver.getCurrentUrl();

		expect(currentUrl).toBe(
			"https://shopvnb.com/chinh-sach-xu-ly-khieu-nai.html"
		);
	});
});

test("Kiểm tra chuyển hướng trang chính sách vận chuyển", async () => {
	await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
		await driver.sleep(1000);
		const element = await driver.findElement(
			By.xpath('//a[@href="chinh-sach-van-chuyen.html"]')
		);

		await element.click();

		const currentUrl = await driver.getCurrentUrl();

		expect(currentUrl).toBe("https://shopvnb.com/chinh-sach-van-chuyen.html");
	});
});

test("Kiểm tra chuyển hướng trang điều khoản sử dụng", async () => {
	await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
		await driver.sleep(1000);
		const element = await driver.findElement(
			By.xpath('//a[@href="dieu-khoan-su-dung.html"]')
		);

		await element.click();

		const currentUrl = await driver.getCurrentUrl();

		expect(currentUrl).toBe("https://shopvnb.com/dieu-khoan-su-dung.html");
	});
});

test("Kiểm tra chuyển hướng trang chính sách Bảo mật thông tin", async () => {
	await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
		await driver.sleep(1000);
		const element = await driver.findElement(
			By.xpath('//a[@href="chinh-sach-bao-mat.html"]')
		);

		await element.click();

		const currentUrl = await driver.getCurrentUrl();

		expect(currentUrl).toBe("https://shopvnb.com/chinh-sach-bao-mat.html");
	});
});

test("Kiểm tra chuyển hướng trang chính sách nhượng quyền", async () => {
	await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
		await driver.sleep(1000);
		const element = await driver.findElement(
			By.xpath('//a[@href="chinh-sach-nhuong-quyen-shopvnb.html"]')
		);

		await element.click();

		const currentUrl = await driver.getCurrentUrl();

		expect(currentUrl).toBe(
			"https://shopvnb.com/chinh-sach-nhuong-quyen-shopvnb.html"
		);
	});
});

afterAll(async () => {
	await sharedDriver.quit();
});

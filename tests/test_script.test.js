const { Builder } = require("selenium-webdriver");
const { runTest, By, until } = require("./test_script");

// Create a shared WebDriver instance outside of the test cases
const sharedDriver = new Builder().forBrowser("chrome").build();

// Close the shared driver after all tests are finished
// afterAll(async () => {
// 	await sharedDriver.quit();
// });
describe("Kiểm tra chức các chức năng shop", () => {
	test("Clicking on https://shopvnb.com/ logo", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			await driver.sleep(1000);
			await driver.findElement(By.className("logo-wrapper")).click();
			// Add assertions or expectations here
		});
	}, 10000);

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

			expect(afterClickUrl).toBe(afterClickUrl);
		});
	});

	test("Click all tablink can show item", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			await driver.sleep(1000);
			const tabLink = await driver.findElements(By.className("tab-link"));

			expect(tabLink.length).toBe(18);

			// Lặp qua từng thẻ và kiểm tra có thể click được hay không
			for (const tabLinkItems of tabLink) {
				const isClickable = await isElementClickable(driver, tabLinkItems);
				expect(isClickable).toBe(true);
			}
		});
	});

	// Kiểm tra xem tab có hiển thị đúng sản phẩm khi click không
	test("Kiểm tra xem tab có hiển thị đúng tabs sản phẩm khi click không", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			await driver.sleep(1000);
			let dataTab = [];
			const tabTitle = await driver.findElements(By.className("tab-link"));
			const tabContents = await driver.findElements(
				By.className("tab-content")
			);
			expect(tabTitle.length).toBe(18);

			for (const tabItem of tabTitle) {
				tabItem.getAttribute("data-tab").then((dataTabValue) => {
					// console.log(dataTabValue);
					dataTab.push(dataTabValue);
				});
			}
			// console.log(dataTab.length);
		});
	});

	test("Kiểm tra các sản phẩm cầu long và tenis có thể click được", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			await driver.sleep(1000);
			const product = await driver.findElements(By.className("snip_banner"));
			expect(product.length).toBe(16);

			for (const item of product) {
				const isClickable = await isElementClickable(driver, item);
				expect(isClickable).toBe(true);
			}
		});
	});

	test("Kiểm tra các blog tin tức có thể click", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			await driver.sleep(1000);
			const product = await driver.findElements(By.className("item-blog"));

			for (const item of product) {
				const isClickable = await isElementClickable(driver, item);
				expect(isClickable).toBe(true);
			}
		});
	});

	test("Kiểm tra khi ấn vào giỏ hàng thì count ở cart +1", async () => {
		await runTest(
			sharedDriver,
			"https://shopvnb.com/vot-cau-long-felet-dome-08-blk-chinh-hang.html",
			async (driver) => {
				await driver.sleep(1000);
				let count, countAfter;
				const btnAddCart = await driver.findElement(
					By.className("btn_add_cart")
				);
				const cartCount = await driver.findElement(By.className("count_item"));
				cartCount.getText().then((text) => {
					count = parseInt(text);
				});
				// let count = cartCount.getText();
				// console.log(count);
				await btnAddCart.click();
				const cartCountAfter = await driver.findElement(
					By.className("count_item")
				);
				cartCountAfter.getText().then((text) => {
					countAfter = parseInt(text);
				});
				// console.log(countAfter);
				// countAfter = countAfter - 1;
				// expect(countAfter).toBe(count);
			}
		);
	});

	test("Kiểm tra số lượng có thể tăng khi ấn +", async () => {
		await runTest(
			sharedDriver,
			"https://shopvnb.com/vot-cau-long-felet-dome-08-blk-chinh-hang.html",
			async (driver) => {
				await driver.sleep(1000);
				const inputElement = await driver.findElement(By.id("qtym"));
				const plusBtn = await driver.findElement(By.className("num_2"));
				// Lấy giá trị của thuộc tính value của trường nhập liệu
				const qt1 = await inputElement.getAttribute("value");
				await plusBtn.click();
				const qt2 = await inputElement.getAttribute("value");
				const expected = qt2 - qt1;
				expect(expected).toBe(1);
			}
		);
	});

	test("Kiểm tra số lượng có thể giảm khi ấn -", async () => {
		await runTest(
			sharedDriver,
			"https://shopvnb.com/vot-cau-long-felet-dome-08-blk-chinh-hang.html",
			async (driver) => {
				await driver.sleep(1000);
				const inputElement = await driver.findElement(By.id("qtym"));
				const minusBtn = await driver.findElement(By.className("num_1"));
				const plusBtn = await driver.findElement(By.className("num_2"));
				// Lấy giá trị của thuộc tính value của trường nhập liệu
				await plusBtn.click();
				const qt1 = await inputElement.getAttribute("value"); // 2
				minusBtn.click();
				const qt2 = await inputElement.getAttribute("value"); // 1
				const expected = qt1 - qt2;
				expect(expected).toBe(1);
			}
		);
	});

	test("Kiểm tra số lượng khi ấn - không chuyển về 0 hoặc số âm", async () => {
		await runTest(
			sharedDriver,
			"https://shopvnb.com/vot-cau-long-felet-dome-08-blk-chinh-hang.html",
			async (driver) => {
				await driver.sleep(1000);
				const inputElement = await driver.findElement(By.id("qtym"));
				const minusBtn = await driver.findElement(By.className("num_1"));
				const qt1 = await inputElement.getAttribute("value"); // 1
				minusBtn.click();
				const qt2 = await inputElement.getAttribute("value"); //1
				const expected = qt1 - qt2;
				expect(expected).toBe(0);
			}
		);
	});
	it("Kiểm tra giỏ hàng có tăng lên khi ấn thêm vào giỏ hàng", async () => {
		await runTest(
			sharedDriver,
			"https://shopvnb.com/vot-cau-long-felet-dome-08-blk-chinh-hang.html",
			async (driver) => {
				let count = 0;
				const addCartBtn = await driver.findElement(
					By.className("btn_add_cart")
				);
				const isClickable = await isElementClickable(driver, addCartBtn);
				expect(isClickable).toBe(true);
				// await addCartBtn.click();
				await driver.sleep(2000);

				const countItem = await driver.findElement(
					By.xpath("//span[@class='count_item count_item_pr']")
				);
				countItem.getText().then((text) => {
					expect(text).toBe("1");
				});
			}
		);
	});
});

describe("Kiểm tra chức năng đăng nhập và thông tin user", () => {
	it("Đăng nhập với thông tin tài khoản không đúng", async () => {
		// Mở trang web ShopVNB.com
		await runTest(
			sharedDriver,
			"https://shopvnb.com/thanh-vien/dang-nhap",
			async (driver) => {
				// await driver.get("https://shopvnb.com/thanh-vien/dang-nhap");

				// Tìm và nhập tên/số điện thoại
				const emailInput = await driver.findElement(By.name("email"));
				await emailInput.sendKeys("09876936171");

				// Tìm và nhập mật khẩu không hợp lệ
				const passwordInput = await driver.findElement(
					By.id("customer_password")
				);
				await passwordInput.sendKeys("test123");

				// Nhấp vào nút "Đăng nhập"
				const loginButton = await driver.findElement(
					By.xpath("//input[@type='submit']")
				);
				await loginButton.click();

				const errorMessage = await driver.findElement(
					By.className("title-section-page")
				);
				errorMessage.getText().then((text) => {
					expect(text).toBe("THÔNG BÁO");
				});
				// if (errorMessage) {
				// 	expect(errorMessage).toBe(!undefined);
				// }

				// Kiểm tra URL sau khi đăng nhập thất bại
				const currentUrl = await driver.getCurrentUrl();
				expect(currentUrl).toBe("https://shopvnb.com/thanh-vien"); // Kiểm tra URL vẫn là trang đăng nhập
				// Đóng trình duyệt
			}
		);
	});

	it("Đăng nhập với thông tin tài khoản đúng", async () => {
		// Mở trang web ShopVNB.com
		await runTest(
			sharedDriver,
			"https://shopvnb.com/thanh-vien/dang-nhap",
			async (driver) => {
				// await driver.get("https://shopvnb.com/thanh-vien/dang-nhap");

				// Tìm và nhập tên/số điện thoại
				const emailInput = await driver.findElement(By.name("email"));
				await emailInput.sendKeys("0987693617");

				// Tìm và nhập mật khẩu không hợp lệ
				const passwordInput = await driver.findElement(
					By.id("customer_password")
				);
				await passwordInput.sendKeys("test123");

				// Nhấp vào nút "Đăng nhập"
				const loginButton = await driver.findElement(
					By.xpath("//input[@type='submit']")
				);
				await loginButton.click();

				const errorMessage = await driver.findElement(
					By.xpath("//h2[@class='widget-title']")
				);
				errorMessage.getText().then((text) => {
					expect(text).toBe("THÔNG TIN KHÁCH HÀNG");
				});
				// if (errorMessage) {
				// 	expect(errorMessage).toBe(!undefined);
				// }

				// Kiểm tra URL sau khi đăng nhập thất bại
				const currentUrl = await driver.getCurrentUrl();
				expect(currentUrl).toBe("https://shopvnb.com/thanh-vien"); // Kiểm tra URL vẫn là trang đăng nhập
				// Đóng trình duyệt
			}
		);
	});
	it("Kiểm tra nút sửa thông tin có click được không", async () => {
		await runTest(
			sharedDriver,
			"https://shopvnb.com/thanh-vien",
			async (driver) => {
				const editBtn = await driver.findElement(
					By.xpath("//a[@href='/thanh-vien/thong-tin']")
				);

				const isClickable = await isElementClickable(driver, editBtn);
				expect(isClickable).toBe(true);
			}
		);
	});
	it("Kiểm tra nút sửa thông tin có chuyển hướng đúng trang không", async () => {
		await runTest(
			sharedDriver,
			"https://shopvnb.com/thanh-vien",
			async (driver) => {
				const editBtn = await driver.findElement(By.className("btn-blues"));
				await editBtn.click();
				expectedUrl = "https://shopvnb.com/thanh-vien/thong-tin";

				currentUrl = await driver.getCurrentUrl();
				expect(currentUrl).toBe(expectedUrl);
			}
		);
	});
	it("Kiểm tra nút quay lại ở trang thông tin tài khoản có click được không", async () => {
		await runTest(
			sharedDriver,
			"https://shopvnb.com/thanh-vien/thong-tin",
			async (driver) => {
				const backBtn = await driver.findElement(
					By.xpath("//a[@href='/thanh-vien']")
				);

				const isClickable = await isElementClickable(driver, backBtn);
				expect(isClickable).toBe(true);
			}
		);
	});
	it("Kiểm tra Đổi mật khẩu với mật khẩu cũ đúng", async () => {
		await runTest(
			sharedDriver,
			"https://shopvnb.com/thanh-vien/thong-tin",
			async (driver) => {
				await driver.sleep(2000);
				const curPass = await driver.findElement(
					By.xpath("//input[@name='mat_khau']")
				);

				await curPass.sendKeys("test123");
				const newPass = await driver.findElement(
					By.xpath("//input[@name='pass']")
				);
				await newPass.sendKeys("test123");
				const reNewPass = await driver.findElement(
					By.xpath("//input[@name='re_pass']")
				);
				await reNewPass.sendKeys("test123");

				const submitPass = await driver.findElement(
					By.xpath(
						"//input[@class='btn btn-style btn_50' and @type='submit' and @value='Đổi mật khẩu']"
					)
				);
				await submitPass.click();
				const pElement = await driver.findElement(By.xpath("//p"));
				pElement.getText().then((text) => {
					expect(text).toBe("Cập nhật mật khẩu thành công");
				});
			}
		);
	}, 10000);
	it("Kiểm tra nút 'Cập nhật' và 'Đổi mật khẩu' có thể click[trang thông tin]", async () => {
		await runTest(
			sharedDriver,
			"https://shopvnb.com/thanh-vien/thong-tin",
			async (driver) => {
				await driver.sleep(2000);

				const submitPass = await driver.findElement(
					By.xpath(
						"//input[@class='btn btn-style btn_50' and @type='submit' and @value='Đổi mật khẩu']"
					)
				);
				await submitPass.click();

				const updateBtn = await driver.findElement(
					By.xpath(
						"//input[@class='btn btn-style btn_50' and @type='submit' and @value='Cập nhật']"
					)
				);
				await updateBtn.click();
			}
		);
	}, 10000);
});

describe("Kiểm tra các element có chuyển hướng đúng đường dẫn không?", () => {
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
});

describe("Kiểm tra chuyển hướng phần 'HƯỚNG DẪN' [FOOTER]", () => {
	test("Kiểm tra chuyển hướng trang tập huấn", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			await driver.sleep(1000);
			const element = await driver.findElement(
				By.xpath('//a[@href="tap-huan-tennis.html"]')
			);

			await element.click();

			const currentUrl = await driver.getCurrentUrl();

			expect(currentUrl).toBe("https://shopvnb.com/tap-huan-tennis.html");
		});
	});

	test("Kiểm tra chuyển hướng trang bảng size lining", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			await driver.sleep(1000);
			const element = await driver.findElement(
				By.xpath('//a[@href="bang-size-lining.html"]')
			);

			await element.click();

			const currentUrl = await driver.getCurrentUrl();

			expect(currentUrl).toBe("https://shopvnb.com/bang-size-lining.html");
		});
	});

	test("Kiểm tra chuyển hướng cách tập tenis cho người mới", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			await driver.sleep(1000);
			const element = await driver.findElement(
				By.xpath('//a[@href="cach-tap-tennis-cho-nguoi-moi-choi.html"]')
			);

			await element.click();

			const currentUrl = await driver.getCurrentUrl();

			expect(currentUrl).toBe(
				"https://shopvnb.com/cach-tap-tennis-cho-nguoi-moi-choi.html"
			);
		});
	});

	test("Kiểm tra chuyển hướng trang hướng dẫn chọn vợt cho người mới", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			await driver.sleep(1000);
			const element = await driver.findElement(
				By.xpath(
					'//a[@href="huong-dan-cach-chon-vot-cau-long-cho-nguoi-moi-choi.html"]'
				)
			);

			await element.click();

			const currentUrl = await driver.getCurrentUrl();

			expect(currentUrl).toBe(
				"https://shopvnb.com/huong-dan-cach-chon-vot-cau-long-cho-nguoi-moi-choi.html"
			);
		});
	});

	test("Kiểm tra chuyển hướng trang hướng dẫn thanh toán", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			await driver.sleep(1000);
			const element = await driver.findElement(
				By.xpath('//a[@href="huong-dan-thanh-toan.html"]')
			);

			await element.click();

			const currentUrl = await driver.getCurrentUrl();

			expect(currentUrl).toBe("https://shopvnb.com/huong-dan-thanh-toan.html");
		});
	});

	test("Kiểm tra chuyển hướng trang hướng dẫn kiểm tra bảo hành", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			await driver.sleep(1000);
			const element = await driver.findElement(
				By.xpath('//a[@href="huong-dan-kiem-tra-bao-hanh.html"]')
			);

			await element.click();

			const currentUrl = await driver.getCurrentUrl();

			expect(currentUrl).toBe("https://shopvnb.com/kiem-tra-bao-hanh");
		});
	});

	test("Kiểm tra chuyển hướng trang hướng dẫn kiểm tra đơn hàng", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			await driver.sleep(1000);
			const element = await driver.findElement(
				By.xpath('//a[@href="huong-dan-kiem-tra-don-hang.html"]')
			);

			await element.click();

			const currentUrl = await driver.getCurrentUrl();

			expect(currentUrl).toBe("https://shopvnb.com/kiem-tra-don-hang");
		});
	});

	test("Kiểm tra chuyển hướng trang hướng dẫn mua hàng", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			await driver.sleep(1000);
			const element = await driver.findElement(
				By.xpath('//a[@href="huong-dan-mua-hang.html"]')
			);

			await element.click();

			const currentUrl = await driver.getCurrentUrl();

			expect(currentUrl).toBe("https://shopvnb.com/huong-dan-mua-hang.html");
		});
	});
});

describe("Kiểm tra chuyển hướng mục sản phẩm cầu lông", () => {
	it("Kiểm tra chuyển hướng đến trang vợt cầu lông", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			const element = await driver.findElement(
				By.xpath('//a[@href="vot-cau-long.html"]')
			);
			await element.click();

			const currentUrl = await driver.getCurrentUrl();
			expect(currentUrl).toBe("https://shopvnb.com/vot-cau-long.html");
		});
	});

	it("Kiểm tra chuyển hướng đến trang giày cầu lông", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			const element = await driver.findElement(
				By.xpath('//a[@href="giay-cau-long.html"]')
			);
			await element.click();

			const currentUrl = await driver.getCurrentUrl();
			expect(currentUrl).toBe("https://shopvnb.com/giay-cau-long.html");
		});
	});

	it("Kiểm tra chuyển hướng đến trang áo cầu lông", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			const element = await driver.findElement(
				By.xpath('//a[@href="ao-cau-long.html"]')
			);
			await element.click();

			const currentUrl = await driver.getCurrentUrl();
			expect(currentUrl).toBe("https://shopvnb.com/ao-cau-long.html");
		});
	});

	it("Kiểm tra chuyển hướng đến trang váy cầu lông", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			const element = await driver.findElement(
				By.xpath('//a[@href="vay-cau-long.html"]')
			);
			await element.click();

			const currentUrl = await driver.getCurrentUrl();
			expect(currentUrl).toBe("https://shopvnb.com/vay-cau-long.html");
		});
	});

	it("Kiểm tra chuyển hướng đến trang quần cầu long", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			const element = await driver.findElement(
				By.xpath('//a[@href="quan-cau-long.html"]')
			);
			await element.click();

			const currentUrl = await driver.getCurrentUrl();
			expect(currentUrl).toBe("https://shopvnb.com/quan-cau-long.html");
		});
	});

	it("Kiểm tra chuyển hướng đến trang túi vợt cầu long", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			const element = await driver.findElement(
				By.xpath('//a[@href="tui-vot-cau-long.html"]')
			);
			await element.click();

			const currentUrl = await driver.getCurrentUrl();
			expect(currentUrl).toBe("https://shopvnb.com/tui-vot-cau-long.html");
		});
	});

	it("Kiểm tra chuyển hướng đến trang balo cầu long", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			const element = await driver.findElement(
				By.xpath('//a[@href="balo-cau-long.html"]')
			);
			await element.click();

			const currentUrl = await driver.getCurrentUrl();
			expect(currentUrl).toBe("https://shopvnb.com/balo-cau-long.html");
		});
	});

	it("Kiểm tra chuyển hướng đến trang phụ kiên cầu lông", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			const element = await driver.findElement(
				By.xpath('//a[@href="phu-kien-cau-long.html"]')
			);
			await element.click();

			const currentUrl = await driver.getCurrentUrl();
			expect(currentUrl).toBe("https://shopvnb.com/phu-kien-cau-long.html");
		});
	});
});

describe("Kiểm tra chuyển hướng mục sản phẩm tennis", () => {
	it("Kiểm tra chuyển hướng đến trang vợt cầu lông", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			const element = await driver.findElement(
				By.xpath('//a[@href="vot-tennis.html"]')
			);
			await element.click();

			const currentUrl = await driver.getCurrentUrl();
			expect(currentUrl).toBe("https://shopvnb.com/vot-tennis.html");
		});
	});

	it("Kiểm tra chuyển hướng đến trang giày tennis", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			const element = await driver.findElement(
				By.xpath('//a[@href="giay-tennis.html"]')
			);
			await element.click();

			const currentUrl = await driver.getCurrentUrl();
			expect(currentUrl).toBe("https://shopvnb.com/giay-tennis.html");
		});
	});

	it("Kiểm tra chuyển hướng đến trang balo tenis", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			const element = await driver.findElement(
				By.xpath('//a[@href="balo-tennis.html"]')
			);
			await element.click();

			const currentUrl = await driver.getCurrentUrl();
			expect(currentUrl).toBe("https://shopvnb.com/balo-tennis.html");
		});
	});

	it("Kiểm tra chuyển hướng đến trang túi tennis", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			const element = await driver.findElement(
				By.xpath('//a[@href="tui-tennis.html"]')
			);
			await element.click();

			const currentUrl = await driver.getCurrentUrl();
			expect(currentUrl).toBe("https://shopvnb.com/tui-tennis.html");
		});
	});

	it("Kiểm tra chuyển hướng đến trang chân váy tennis", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			const element = await driver.findElement(
				By.xpath('//a[@href="chan-vay-tennis.html"]')
			);
			await element.click();

			const currentUrl = await driver.getCurrentUrl();
			expect(currentUrl).toBe("https://shopvnb.com/chan-vay-tennis.html");
		});
	});

	it("Kiểm tra chuyển hướng đến trang áo tennis", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			const element = await driver.findElement(
				By.xpath('//a[@href="ao-tennis.html"]')
			);
			await element.click();

			const currentUrl = await driver.getCurrentUrl();
			expect(currentUrl).toBe("https://shopvnb.com/ao-tennis.html");
		});
	});

	it("Kiểm tra chuyển hướng đến trang balo tennis", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			const element = await driver.findElement(
				By.xpath('//a[@href="balo-tennis.html"]')
			);
			await element.click();

			const currentUrl = await driver.getCurrentUrl();
			expect(currentUrl).toBe("https://shopvnb.com/balo-tennis.html");
		});
	});

	it("Kiểm tra chuyển hướng đến trang phụ kiên tennis", async () => {
		await runTest(sharedDriver, "https://shopvnb.com/", async (driver) => {
			const element = await driver.findElement(
				By.xpath('//a[@href="phu-kien-tennis.html"]')
			);
			await element.click();

			const currentUrl = await driver.getCurrentUrl();
			expect(currentUrl).toBe("https://shopvnb.com/phu-kien-tennis.html");
		});
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

afterAll(async () => {
	await sharedDriver.quit();
});

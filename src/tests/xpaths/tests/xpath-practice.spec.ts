import { test, expect } from '@playwright/test';

test.describe('XPath Practice', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('file://' + process.cwd() + '/xpath-practice.html');
  });

  test('practice all XPath formats', async ({ page }) => {
    // 1. By tag
    await expect(page.locator('//h1')).toHaveText('XPath Practice Page');

    // 2. By id
    await page.locator("//input[@id='email']").fill('test@test.com');

    // 3. By type
    await page.locator("//input[@type='password']").fill('Password123');

    // 4. By placeholder
    await expect(page.locator("//input[@placeholder='Enter email']")).toHaveValue('test@test.com');

    // 5. By exact text
    await expect(page.locator("//button[text()='Save']")).toBeVisible();

    // 6. By contains text
    await expect(page.locator("//button[contains(text(),'Delete')]")).toBeVisible();

    // 7. By class contains
    await expect(page.locator("//button[contains(@class,'primary')]")).toHaveCount(2);

    // 8. Multiple conditions
    await expect(page.locator("//input[@type='text' and @id='email']")).toBeVisible();

    // 9. Following sibling: label -> input
    await page.locator("//label[text()='Email']/following-sibling::input").fill('jeremy@test.com');

    // 10. Parent
    await expect(page.locator("//input[@id='email']/parent::form")).toHaveAttribute('id', 'login-form');

    // 11. Index
    await expect(page.locator("(//button)[1]")).toHaveText('Login');

    // 12. Table row by text
    await expect(page.locator("//td[text()='Jeremy']/following-sibling::td[text()='QA Engineer']")).toBeVisible();

    // 13. Table action button for specific user
    await expect(page.locator("//td[text()='Jeremy']/following-sibling::td/button[text()='Edit']")).toBeVisible();

    // 14. Nested card by title
    await expect(page.locator("//h2[text()='QA Team']/ancestor::div[contains(@class,'card')]")).toBeVisible();

    // 15. Button inside specific card
    await expect(page.locator("//h2[text()='API Testing']/ancestor::div[contains(@class,'card')]//button")).toHaveText('Open Module');

    // 16. Dynamic class
    await expect(page.locator("//div[contains(@class,'user-profile')]")).toBeVisible();

    // 17. starts-with
    await expect(page.locator("//div[starts-with(@class,'user-profile')]")).toBeVisible();

    // 18. normalize-space
    await expect(page.locator("//button[normalize-space()='Confirm']")).toBeVisible();

    // 19. Dropdown
    await page.locator("//select[@id='country']").selectOption('cr');
    await expect(page.locator("//select[@id='country']")).toHaveValue('cr');
  });
});
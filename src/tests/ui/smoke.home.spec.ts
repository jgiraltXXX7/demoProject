import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/homePage';

test.describe('UI | Home smoke', () => {
  test('searches docs', async ({ page }) => {
    const home = new HomePage(page);
    await home.gotoDocs();
    await home.search('assertions');
    // Land on some docs content
    await expect(page.locator('main')).toContainText(/assert/i);
  });
});
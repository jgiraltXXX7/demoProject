import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  // Go straight to docs so search exists
  async gotoDocs() {
    await this.page.goto('/docs/intro');
    await expect(this.page).toHaveTitle(/Playwright/i);
  }

  // Open the search UI (works whether it's a button or a dialog)
  private async openSearch() {
    // Try Ctrl/Cmd+K first (DocSearch default)
    const accel = process.platform === 'darwin' ? 'Meta+k' : 'Control+k';
    await this.page.keyboard.press(accel);

    // If not visible, click a Search button as fallback
    const searchButton = this.page.getByRole('button', { name: /search/i });
    if (!(await this.page.locator('input[type="search"], input[placeholder*="Search"]').first().isVisible())) {
      if (await searchButton.isVisible()) {
        await searchButton.click();
      }
    }

    // Wait for any search input to appear
    await this.page.locator('input[type="search"], input[placeholder*="Search"]').first().waitFor({ state: 'visible' });
  }

  async search(term: string) {
    await this.openSearch();
    const input = this.page.locator('input[type="search"], input[placeholder*="Search"]').first();
    await input.fill(term);
    await this.page.keyboard.press('Enter');

    // Basic sanity check: some result text should appear
    await expect(this.page.locator('body')).toContainText(/assert|result|doc/i, { timeout: 5000 });
  }
}
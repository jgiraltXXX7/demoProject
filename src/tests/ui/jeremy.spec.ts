import { test, expect } from '@playwright/test';



test.describe('tests code challenge', () => {
  test('First test cases', async ({ page }) => {
    ///locators
    const inputTextOne = page.getByRole('textbox', { name: 'Paste one version of a text' });
    const inputTextTwo = page.getByRole('textbox', { name: 'Paste another version of the' });
    const compareButton = page.getByRole('button', { name: 'Compare!' });
    const userMessage= page.getByText('The two texts are identical!');
    await test.step('1. Go to the demo app url', async () => {
      await page.waitForTimeout(2000);
      await page.goto('https://www.text-compare.com');
      await inputTextOne.fill('Hello World');
      await inputTextTwo.fill('Hello World');


    });
    await test.step('2. Click the Compare button', async () => {
      await compareButton.click();
    });

      await test.step('3. Assert that the message "The two texts are identical!" is displayed', async () => {
        await expect(userMessage).toBeVisible();
      });
    });

test('Verify API response and handle content type correctly', async ({ request }) => {
  const response = await request.post('https://text-compare.com/', {
    form: {
      text1: 'Hello World',
      text2: 'Hello World',
    },
  });

  await test.step('1. Validate response status', async () => {
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  await test.step('2. Validate response based on content-type', async () => {
    const contentType = response.headers()['content-type'] || '';

    console.log('Content-Type:', contentType);

    if (contentType.includes('application/json')) {
      const body = await response.json();

      console.log(body);

      expect(body).toHaveProperty('messageForUser');
      expect(body.messageForUser).toContain('identical');

    } else {
      const body = await response.text();

      console.log(body);

      // Fallback validation for HTML response
      expect(body).toContain('identical');
    }
  });
});
});


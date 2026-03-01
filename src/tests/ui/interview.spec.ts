import { test, expect } from '@playwright/test';

test.describe('tests code challenge', () => {
  test('first test challenge', async ({ page }) => {
    // Declare locators at the same level (top of the test)
    const newTodoInput = page.locator('.new-todo');
    const todoList = page.locator('.todo-list');
    const todoItems = page.locator('li[data-testid="todo-item"]');
    const firstToggleButton = todoItems.first().locator('input[aria-label="Toggle Todo"]');
    const completedFilter = page.locator('a[href="#/completed"]');

    await test.step('1. Go to the demo app url', async () => {
      await page.goto('https://demo.playwright.dev/todomvc/');
    });

    await test.step('2. Add two new todo items', async () => {
      await newTodoInput.fill('complete playwright challenge');
      await newTodoInput.press('Enter');

      await newTodoInput.fill('submit the challenge');
      await newTodoInput.press('Enter');
    });

    await test.step('3. Assert todo list is present', async () => {
      await expect(todoList).toBeVisible();
    });

    await test.step('4. Assert the list contains exactly 2 todo items', async () => {
      await expect(todoItems).toHaveCount(2);
    });

    await test.step('5. Mark the first todo as completed (use the checkbox toggle)', async () => {
      await firstToggleButton.check();
      await expect(firstToggleButton).toBeChecked();
    });

    await test.step('6. Click the Completed filter in the footer/navigation', async () => {
      await completedFilter.click();
    });

    await test.step('7. Assert that after filtering, only 1 todo item is shown', async () => {
      await expect(todoItems).toHaveCount(1);
    });
  });
});
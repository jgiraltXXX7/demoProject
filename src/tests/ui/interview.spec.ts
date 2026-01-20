import { test, expect } from '@playwright/test';

test('Navigate to the application and add new todo items', async ({ page }) => {
  // Locators
  const newTodoInput = page.locator('.new-todo');
  const todoList = page.locator('.todo-list');
  const todoItems = page.locator('.todo-list li');
  const firstTodoToggle = page.locator('.todo-list li').first().locator('.toggle');
  const completedFilter = page.locator('a[href="#/completed"]');

  // Step 1: Navigate to the application
  await page.goto('https://demo.playwright.dev/todomvc/');

  // Step 2: Add new todo items
  await newTodoInput.fill('Complete Playwright Challenge');
  await newTodoInput.press('Enter');

  await newTodoInput.fill('Submit the challenge');
  await newTodoInput.press('Enter');

  // Step 3: Verify todo list is visible and has 2 items
  await expect(todoList).toBeVisible();
  await expect(todoItems).toHaveCount(2);

  // Step 4: Mark first todo as completed
  await firstTodoToggle.check();
  await expect(firstTodoToggle).toBeChecked();

  // Step 5: Filter by completed items
  await completedFilter.click();

  // Step 6: Verify only one completed item is shown
  await expect(todoItems).toHaveCount(1);
});

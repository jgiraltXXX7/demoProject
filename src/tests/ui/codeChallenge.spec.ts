import { test, expect } from '@playwright/test';

//Get  user list and verify response
test('get users list and verify response', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users');
  expect(response.status()).toBe(200);
  expect(response.statusText()).toBe('OK');
  expect(Array.isArray(await response.json())).toBe(true);
  const users = await response.json();
  expect(users.length).toBeGreaterThan(0);
  expect(users[1]).toHaveProperty('email');
});

//Create a new post and verify response
test('create a new post and verify response', async ({ request }) => {
  const postData = {    
    title: 'My New Post',
    body: 'This is the content of my new post.',
    userId: 1
  };

  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: postData
  });

  expect(response.status()).toBe(201);
});

test('search  for product laptop and verify results', async ({ page }) => {  
  await page.goto('https://demo.nopcommerce.com/');

  //verify if the home page has been displayed after login
  const homePageTitle = page.getByRole('link', { name: 'nopCommerce demo store' });
  expect(homePageTitle).toBeVisible();
  

  // Locate the search box, enter 'laptop', and submit the search
  const searchBox = page.locator('input[id="small-searchterms"]');
  await searchBox.fill('Asus');
  await searchBox.press('Enter');

  // Verify that the search results page is displayed and contains results
  await expect(page).toHaveURL('https://demo.nopcommerce.com/search?q=Asus');
  const searchResults = page.locator('.product-item');
  await expect(searchResults.first()).toContainText('Asus');
});
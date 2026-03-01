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
  await page.fill('#email', 'testing@test.com');
  await page.fill('#password', 'Testing@123');
  await page.click('button[type="submit"]');

  //verify if the home page has been displayed after login
  await expect(page).toHaveURL('https://demo.nopcommerce.com/Home');
  await expect(page).toHaveTitle('nopCommerce demo store');
  

  // Locate the search box, enter 'laptop', and submit the search
  const searchBox = page.locator('input[id="small-searchterms"]');
  await searchBox.fill('laptop');
  await searchBox.press('Enter');
});
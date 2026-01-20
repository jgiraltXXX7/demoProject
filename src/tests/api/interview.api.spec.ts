import { test, expect } from '@playwright/test';
import { log } from 'console';

test('GET users returns list of users', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users');

  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(Array.isArray(body)).toBeTruthy();

  const users = await response.json();
  expect(users.length).toBeGreaterThan(0);
  expect(users[0]).toHaveProperty('email');
  console.log(users);
});

test('POST creates a new post', async ({ request }) => {
  const response = await request.post(
    'https://jsonplaceholder.typicode.com/posts',
    {
      data: {
        title: 'Playwright API Test',
        body: 'This is a test post',
        userId: 1
      }
    }
  );

  expect(response.status()).toBe(201);

  const json = await response.json();
  expect(json.title).toBe('Playwright API Test');
  expect(json.id).toBeDefined();
  console.log(json);
});


let accessToken: string;
let userId: number;

test.describe('Reuse token with meaningful GET requests', () => {

  test.beforeAll(async ({ request }) => {
    // 1️⃣ Login
    const loginRes = await request.post('https://dummyjson.com/auth/login', {
      data: {
        username: 'emilys',
        password: 'emilyspass'
      },
      headers: { 'Content-Type': 'application/json' }
    });

    expect(loginRes.status()).toBe(200);

    const loginBody = await loginRes.json();
    accessToken = loginBody.accessToken;

    expect(accessToken).toBeTruthy();
  });

  test('GET /auth/me → extract userId', async ({ request }) => {
    const meRes = await request.get('https://dummyjson.com/auth/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    expect(meRes.status()).toBe(200);

    const meBody = await meRes.json();
    expect(meBody).toHaveProperty('id');

    userId = meBody.id;
  });

  test('GET /users/{userId} using same token', async ({ request }) => {
    const userRes = await request.get(
      `https://dummyjson.com/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    expect(userRes.status()).toBe(200);

    const userBody = await userRes.json();
    expect(userBody.id).toBe(userId);
    expect(userBody).toHaveProperty('username');
  });

});



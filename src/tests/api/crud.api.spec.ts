import{expect, test}from'@playwright/test';
import { type } from 'node:os';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe ('CRUD API Tests', () => {

test('GET users returns list of users', async ({ request }) => {
  const response = await request.get(BASE_URL + '/users');
//status Validations
expect(response.ok()).toBeTruthy();
expect(response.status()).toBe(200);

//body Validations
const body = await response.json();
expect(typeof body).toBe('object');
expect(Array.isArray(body)).toBeTruthy();
expect (body.length).toBeGreaterThan(0);

//property Validations
expect(body[0]).toHaveProperty('id');
expect(body[0]).toHaveProperty('name');
expect(body[0]).toHaveProperty('username');
expect(body[0]).toHaveProperty('email');
expect(body[0 ]).toHaveProperty('address'); 
//nested property Validations
expect(body[0]).toHaveProperty('address.street');
expect(body[0]).toHaveProperty('address.city');
expect(body[0]).toHaveProperty('address.geo.lat');
expect(body[0]).toHaveProperty('address.geo.lng');


//value Validations
expect(typeof body[0].email).toBe("string");
expect(typeof body[0].id).toBe('number');
expect(typeof body[0].name).toBe('string');
expect(typeof body[0].username).toBe('string');
expect(typeof body[0].email).toBe('string');
expect(typeof body[0].address.street).toBe('string');
expect(typeof body[0].address.city).toBe('string');
expect(typeof body[0].address.geo.lat).toBe('string');
expect(typeof body[0].address.geo.lng).toBe('string');

//constraction Validations

expect(body[0]).toMatchObject({
  id: expect.any(Number),
  name: expect.any(String), 
  username: expect.any(String),
  email: expect.any(String),
  address: {
    street: expect.any(String),
    city: expect.any(String),
    geo: {
      lat: expect.any(String),
      lng: expect.any(String)
    }
  }
});

console.log(body);
});

test('POST creates a new post', async ({ request }) => {
  const payload= {
    title: 'Playwright API Test',
    body: 'This is a test post',
    userId: 1
  }
  const response = await request.post(BASE_URL + '/posts', {
    data: payload,
    headers: { 'Content-Type': 'application/json' }
  });

  //status Validations
expect(response.status()).toBe(201);
expect(response.ok()).toBeTruthy();
//body Validations
const responseBody = await response.json();
expect(typeof responseBody).toBe('object');
expect(typeof responseBody).toBe('object');

//property Validations
expect(responseBody).toHaveProperty('id');
expect(responseBody).toHaveProperty('title');
expect(responseBody).toHaveProperty('body');
expect(responseBody).toHaveProperty('userId');    

//value Validations
expect(typeof responseBody.id).toBe('number');
expect(typeof responseBody.title).toBe('string');
expect(typeof responseBody.body).toBe('string');
expect(typeof responseBody.userId).toBe('number');  
expect(responseBody.title).toBe(payload.title);
expect(responseBody.body).toBe(payload.body);
expect(responseBody.userId).toBe(payload.userId);
expect(responseBody.id).toBeDefined();
});

test('PUT updates an existing post', async ({ request }) => {
  const payload = {
    title: 'Updated Title',
    body: 'Updated body content',
    userId: 1
  };
  const response = await request.put(BASE_URL + '/posts/1', {
   data: payload,
   headers: { 'Content-Type': 'application/json' }
  });
  //status Validations
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  //body Validations
  const responseBody = await response.json();
  expect (typeof responseBody).toBe('object');
  expect(typeof responseBody).toBe('object');
//property Validations
expect(responseBody).toHaveProperty('id');
expect(responseBody).toHaveProperty('title');
expect(responseBody).toHaveProperty('body');
expect(responseBody).toHaveProperty('userId');
//value Validations
expect(typeof responseBody.id).toBe('number');
expect(typeof responseBody.title).toBe('string');
expect(typeof responseBody.body).toBe('string');
expect(typeof responseBody.userId).toBe('number');  
expect(responseBody.title).toBe(payload.title);
expect(responseBody.body).toBe(payload.body);
expect(responseBody.userId).toBe(payload.userId);
expect(responseBody.id).toBe(1);  
console.log(responseBody);
})

test('PATCH updates a post title', async ({ request }) => {
  const patch = {title:'Updated Title'};
  const response = await request.patch(BASE_URL+'/posts/1', {
    data : patch,
    headers: { 'Content-Type': 'application/json' }
  });
//status Validations
expect(response.ok()).toBeTruthy();
expect(response.status()).toBe(200);

//body Validations
const patchedBody = await response.json();
expect(typeof patchedBody).toBe('object');
expect(typeof patchedBody).toBe('object');
//property Validations
expect(patchedBody).toHaveProperty('id');   
expect(patchedBody.title).toBe(patch.title);

console.log(patchedBody);
});

test('DELETE removes a post', async ({ request }) => {
  const response = await request.delete(BASE_URL + '/posts/1');   
//status Validations
expect(response.ok()).toBeTruthy();
expect(response.status()).toBe(200);  
//body Validations
const responseBody = await response.text();
expect(responseBody).toBe("{}");  
});

});
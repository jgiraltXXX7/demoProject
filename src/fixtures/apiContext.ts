import { request, APIRequestContext, test as base } from '@playwright/test';

type Fixtures = { api: APIRequestContext };

export const test = base.extend<Fixtures>({
  api: async ({}, use) => {
    const api = await request.newContext({
      baseURL: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com',
      extraHTTPHeaders: { 'Content-Type': 'application/json' }
    });
    await use(api);
    await api.dispose();
  }
});
export const expect = test.expect;
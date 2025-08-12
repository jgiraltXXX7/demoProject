import { test, expect } from '../../fixtures/apiContext';
import type { APIResponse, TestInfo } from '@playwright/test';

// --- helpers ---------------------------------------------------------------
const SENSITIVE = /authorization|cookie|token|apikey|api-key|x-api-key/i;

function redactHeaders(h: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(h || {})) out[k] = SENSITIVE.test(k) ? '***redacted***' : v;
  return out;
}

async function attachJson(info: TestInfo, name: string, data: unknown) {
  await info.attach(name, {
    body: JSON.stringify(data, null, 2),
    contentType: 'application/json',
  });
}

async function logResponse(info: TestInfo, res: APIResponse, method: string) {
  const url = res.url();

  // Request
  console.log(`\n[HTTP] ${url}`);
  // Cannot log request method, headers, or body as APIResponse does not expose them
  console.log('[HTTP] requestHeaders:', '[unavailable]');
  console.log('[HTTP] requestBody:', '[unavailable]');

  // Response
  const status = res.status();
  const resHeaders = res.headers();
  console.log('[HTTP] status:', status);
  console.log('[HTTP] responseHeaders:', JSON.stringify(resHeaders, null, 2));

  const text = await res.text();
  let json: unknown | null = null;
  try { json = JSON.parse(text); } catch { /* not JSON */ }

  if (json !== null) {
    console.log('[HTTP] responseJson:', JSON.stringify(json, null, 2));
    await attachJson(info, `response ${method} ${url}`, json);
    return json;
  } else {
    const preview = text.length > 2000 ? text.slice(0, 2000) + '…(truncated)' : text;
    console.log('[HTTP] responseText:', preview);
    await info.attach(`response ${method} ${url}`, { body: text, contentType: 'text/plain' });
    return text;
  }
}
// ---------------------------------------------------------------------------

test.describe('API | Users', () => {
  test('GET /users returns array', async ({ api }) => {
    const t0 = Date.now();
    const res = await api.get('/users', { failOnStatusCode: false });
    const elapsed = Date.now() - t0;

    const payload = await logResponse(test.info(), res, 'GET');
    console.log(`[HTTP] elapsed=${elapsed}ms`);

    expect(res.ok(), `Expected 2xx but got ${res.status()}`).toBeTruthy();
    expect(Array.isArray(payload)).toBe(true);
    expect((payload as any[])[0]).toHaveProperty('id');
  });

  test('POST /posts creates resource', async ({ api }) => {
    const payload = { title: 'hello', body: 'world', userId: 1 };

    const t0 = Date.now();
    const res = await api.post('/posts', { data: payload, failOnStatusCode: false });
    const elapsed = Date.now() - t0;

    const body = await logResponse(test.info(), res, 'POST');
    console.log(`[HTTP] elapsed=${elapsed}ms`);

    expect(res.status(), 'Should return 201 Created').toBe(201);
    expect(body).toMatchObject(payload);
  });
});

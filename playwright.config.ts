import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

const env = process.env.ENV || 'local';
dotenv.config({ path: path.resolve(__dirname, `.env.${env}`) });

export default defineConfig({
  testDir: './src/tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  retries: 1,
use: {
  baseURL: process.env.APP_ORIGIN,
  trace: 'on-first-retry',
  video: 'retain-on-failure',
  screenshot: 'only-on-failure'
},
projects: [
  { name: 'ui',  testMatch: 'src/tests/ui/**/*.spec.ts',  use: { ...devices['Desktop Chrome'] } },
  { name: 'api', testMatch: 'src/tests/api/**/*.spec.ts' },
  { name: 'db',  testMatch: 'src/tests/db/**/*.spec.ts' }
],
workers: 4,

reporter: [
  ['list'],
  ['html', { open: 'on-failure' }], // auto-open if something fails
  ['allure-playwright']             // keeps Allure results too
],

});
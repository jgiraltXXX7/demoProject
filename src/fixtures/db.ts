import { test as base } from '@playwright/test';
import { Pool } from 'pg';

type Db = { db: Pool };

export const test = base.extend<Db>({
  db: async ({}, use, testInfo) => {
    const pool = new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 5432),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      max: 2
    });
    await use(pool);
    await pool.end();
  }
});

export const expect = base.expect;

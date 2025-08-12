import { test, expect } from '../../fixtures/db';

test.describe('DB | Health & basic queries', () => {
  test('can connect and SELECT 1', async ({ db }) => {
    const res = await db.query('SELECT 1 as ok;');
    expect(res.rows[0].ok).toBe(1);
  });

  test('seeded users are present', async ({ db }) => {
    const { rows } = await db.query('SELECT COUNT(*)::int AS n FROM users;');
    expect(rows[0].n).toBe(5); // matches 002_seed.sql
  });

  test('temp table in a transaction (no side effects)', async ({ db }) => {
    const client = await db.connect();
    try {
      await client.query('BEGIN');
      await client.query('CREATE TEMP TABLE t(id INT);');
      await client.query('INSERT INTO t(id) VALUES ($1), ($2);', [1, 2]);
      const { rows } = await client.query('SELECT COUNT(*)::int AS n FROM t;');
      expect(rows[0].n).toBe(2);
      await client.query('ROLLBACK'); // cleanup
    } finally {
      client.release();
    }
  });
});

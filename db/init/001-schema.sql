-- Create a simple demo table used by your tests
CREATE TABLE IF NOT EXISTS users (
  id   INT PRIMARY KEY,
  name TEXT NOT NULL
);

-- (Optional) index for name lookups
CREATE INDEX IF NOT EXISTS idx_users_name ON users(name);

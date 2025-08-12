-- Seed a couple of rows for demo assertions
INSERT INTO users (id, name) VALUES
  (1, 'Alice'),
  (2, 'Bob'),
  (3, 'Charlie'),
  (4, 'Diana'),
  (5, 'Eve')
ON CONFLICT (id) DO NOTHING;

import { getDb } from '../database/connection.js';

const publicUserColumns = 'id, name, email, created_at';

export async function createUser({ name, email, passwordHash }) {
  const db = await getDb();
  const result = await db.run(
    `INSERT INTO users (name, email, password_hash)
     VALUES (?, ?, ?)`,
    name,
    email,
    passwordHash
  );

  return findUserById(result.lastID);
}

export async function findUserByEmail(email) {
  const db = await getDb();
  return db.get('SELECT * FROM users WHERE email = ?', email);
}

export async function findUserById(id) {
  const db = await getDb();
  return db.get(`SELECT ${publicUserColumns} FROM users WHERE id = ?`, id);
}


import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { runMigrations } from './migrations.js';
import { seedEvents } from './seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let database;

function resolveDatabasePath() {
  const configuredPath = process.env.DB_PATH;

  if (!configuredPath) {
    return path.resolve(__dirname, '../../database/fitconnect.sqlite');
  }

  if (configuredPath === ':memory:') {
    return configuredPath;
  }

  return path.isAbsolute(configuredPath)
    ? configuredPath
    : path.resolve(__dirname, '../../', configuredPath);
}

export async function initializeDatabase() {
  if (database) {
    return database;
  }

  const filename = resolveDatabasePath();

  if (filename !== ':memory:') {
    fs.mkdirSync(path.dirname(filename), { recursive: true });
  }

  database = await open({
    filename,
    driver: sqlite3.Database
  });

  await database.exec('PRAGMA foreign_keys = ON');
  await runMigrations(database);
  await seedEvents(database);

  return database;
}

export async function getDb() {
  return initializeDatabase();
}

export async function closeDatabase() {
  if (database) {
    await database.close();
    database = null;
  }
}

export async function resetDatabaseForTests() {
  await closeDatabase();
  process.env.DB_PATH = ':memory:';
  return initializeDatabase();
}


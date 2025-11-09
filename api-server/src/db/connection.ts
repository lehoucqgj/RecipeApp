import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Database;
export const connectDb = async () => {
  db = await open({
    filename: './RecipeApp.db',
    driver: sqlite3.Database
  });

  await db.exec(`PRAGMA foreign_keys = ON;`);
  console.log('Connected to the SQLite database.');
}

export const getDb = (): Database => {
    if (!db) throw new Error('Database not connected. Call connectDb() first.');
    return db;
}
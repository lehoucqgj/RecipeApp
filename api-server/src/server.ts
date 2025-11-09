import express from 'express';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Database;
const connectDb = async () => {
  db = await open({
    filename: './RecipeApp.db',
    driver: sqlite3.Database
  });

  await db.exec(`PRAGMA foreign_keys = ON;`);
  console.log('Connected to the SQLite database.');
}

const initDb = async () => {
  await db.exec(
    `CREATE TABLE IF NOT EXISTS Recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      time_to_prepare INTEGER NOT NULL
      );`  
    );
      await db.exec(
    `CREATE TABLE IF NOT EXISTS Ingredients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
      );`  
    );
      await db.exec(
    // quantity will need to change to something else than TEXT
    `CREATE TABLE IF NOT EXISTS RecipeIngredients (
      recipe_id INTEGER,
      ingredient_id INTEGER,
      quantity TEXT,
      PRIMARY KEY (recipe_id, ingredient_id),
      FOREIGN KEY (recipe_id) REFERENCES Recipes(id) ON DELETE CASCADE,
      FOREIGN KEY (ingredient_id) REFERENCES Ingredients(id) ON DELETE CASCADE
      );`  
    );
  console.log('Database initialized.');
}

await connectDb();
await initDb();

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
import { getDb } from './connection.js';

//Depricated, used Dbeaver to update columns
export const initDb = async () => {
  //TODO: add extra columns as needed (quntity, etc)
  //TODO: Make that if tables are changed, they get updated accordingly
  //TODO: try catches n stuff
  const db = getDb();
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
    //TODO: quantity will need to change to something else than TEXT
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
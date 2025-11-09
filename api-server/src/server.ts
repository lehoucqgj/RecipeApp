import express, { type NextFunction } from 'express';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';


//TODO: move to separate file
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
  //TODO: add extra columns as needed (quntity, etc)
  //TODO: Make that if tables are changed, they get updated accordingly
  //TODO: try catches n stuff
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

await connectDb();
await initDb();

interface Recipe {
  id?: number;
  name: string;
  time_to_prepare: number;
}

const createRecipe = async (recipe: Recipe) => {
  const result = await db.run(
    'INSERT INTO Recipes (name, time_to_prepare) VALUES (?, ?);',
    recipe.name,
    recipe.time_to_prepare
  );
  return {
    id: result.lastID,
    name: recipe.name,
    time_to_prepare: recipe.time_to_prepare
  } 
}

const getAllRecipes = async (): Promise<Recipe[]> =>{
  return db.all('SELECT * FROM Recipes;');
} 

const getRecipeById = async (id: number): Promise<Recipe | undefined> => {
  return db.get('SELECT * FROM Recipes WHERE id = ?;', id);
}

const deleteRecipeById = async (id: number): Promise<void> => {
  await db.run('DELETE FROM Recipes WHERE id = ?;', id);
}



const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Recipe API is running');
});

//TODO: implement error handling middleware
app.post('/recipes', async (req, res, next) => {
  const { name, time_to_prepare } = req.body;
  try {
    const newRecipe = await createRecipe({ name, time_to_prepare });
    res.status(201).json(newRecipe);
  } catch (err) {
    next(err);
  }
});

app.get('/recipes', async (req, res, next) => {
  try {
    const recipes = await getAllRecipes();
    res.json(recipes);
  } catch (err) {
    next(err);
  }
});

app.get('/recipes/:id', async (req, res, next) => {
  const recipeId = parseInt(req.params.id as string);
  try{
    const recipe = await getRecipeById(recipeId);
    if(recipe){
      res.json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (err) {
    next(err);
  }
});

app.delete('/recipes/:id', async (req, res, next) => {
  const recipeId = parseInt(req.params.id as string);
  try{
    await deleteRecipeById(recipeId);
    res.status(204).send();
  }catch(err){
    next(err);
  }
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
import { getDb } from './connection.js';


interface Recipe {
    id?: number;
    name: string;
    time_to_prepare: number;
}

export const createRecipe = async (recipe: Recipe) => {
    const db = getDb();
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

export const getAllRecipes = async (): Promise<Recipe[]> =>{
    const db = getDb();
  return db.all('SELECT * FROM Recipes;');
} 

export const getRecipeById = async (id: number): Promise<Recipe | undefined> => {
    const db = getDb();
  return db.get('SELECT * FROM Recipes WHERE id = ?;', id);
}

export const deleteRecipeById = async (id: number): Promise<void> => {
    const db = getDb();
  await db.run('DELETE FROM Recipes WHERE id = ?;', id);
}

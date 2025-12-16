import { getDb } from './connection.js';


interface Recipe {
    id?: number;
    name: string;
    timeToPrepare: number;
    instructions?: string;
    servings?: number;
}

interface Ingredient {
  id?: number;
  name: string;
}

interface RecipeIngredientDetail{
  id?: number;
  recipeId: number;
  name: string;
  quantity: string;
}

export const createRecipe = async (recipe: Recipe) => {
    const db = getDb();
  const result = await db.run(
    'INSERT INTO Recipes (name, time_to_prepare, instructions, servings) VALUES (?, ?, ?, ?);',
    recipe.name,
    recipe.timeToPrepare,
    recipe.instructions,
    recipe.servings
  );
  return {
    id: result.lastID,
    name: recipe.name,
    timeToPrepare: recipe.timeToPrepare,
    instructions: recipe.instructions,
    servings: recipe.servings
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

export const getIngredientsByRecipeId = async (id: number): Promise<RecipeIngredientDetail[] | undefined> => {
  const db = getDb();
  return db.all(`SELECT i.name, ri.quantity, ri.recipe_id
          FROM RecipeIngredients ri
          JOIN Ingredients i on ri.ingredient_id = i.id 
          WHERE ri.recipe_id = ?;`, id);
}
import { getDb } from './connection.js';

//TODO check amount of interfaces
interface Recipe {
    id?: number;
    name: string;
    timeToPrepare: number;
    instructions?: string;
    servings?: number;
}

// interface Ingredient {
//   id?: number;
//   name: string;
// }

interface RecipeIngredientDetail{
  id?: number;
  recipeId: number;
  name: string;
  quantity: string;
}


// export const createRecipe = async (recipe: Recipe) => {
//     const db = getDb();
//   const result = await db.run(
//     'INSERT INTO Recipes (name, time_to_prepare, instructions, servings) VALUES (?, ?, ?, ?);',
//     recipe.name,
//     recipe.timeToPrepare,
//     recipe.instructions,
//     recipe.servings
//   );
//   return {
//     id: result.lastID,
//     name: recipe.name,
//     timeToPrepare: recipe.timeToPrepare,
//     instructions: recipe.instructions,
//     servings: recipe.servings
//   } 
// }

// export const addIngredient = async (ingredient: RecipeIngredient) => {
//   const db = getDb();
//   const result = await db.run(
//     `INSERT INTO RecipeIngredients (recipe_id, ingredient_id, quantity, quantifier)
//      VALUES (?, ?, ?, ?);`,
//     ingredient.recipeId,
//     ingredient.ingredientId,
//     ingredient.quantity,
//     ingredient.quantifier
//     );
//     return {
//       recipeId: ingredient.recipeId,
//       ingredientId: ingredient.ingredientId,
//       quantity: ingredient.quantity,
//       quantifier: ingredient.quantifier
//     }
// }

export const createRecipeWithIngredients = async (
  recipe: Recipe,
  ingredients: Array<{name: string, quantity: number, quantifier: string}> ) => {
  const db = getDb();
  
  try{
    await db.run('BEGIN TRANSACTION');
    
    const result = await db.run(
      'INSERT INTO Recipes (name, time_to_prepare, instructions, servings) VALUES (?, ?, ?, ?)',
      recipe.name, 
      recipe.timeToPrepare, 
      recipe.instructions, 
      recipe.servings
    );
    
    const recipeId = result.lastID;

    for (const ingr of ingredients){
      const ingredient = await db.get(
        'SELECT * FROM Ingredients WHERE name = ?',
        ingr.name
      );
      if (!ingredient){
        throw new Error(`Ingredient ${ingr.name} not found!`);
      }
      await db.run(
        'INSERT INTO RecipeIngredient (recipe_id, ingredient_id, quantity, quantifier) VALUES(?, ?, ?, ?)',
        recipeId,
        ingredient.id,
        ingr.quantity,
        ingr.quantifier
      );
    }

    await db.run('COMMIT');

    return{
      id: recipeId,
      name: recipe.name,
      timeToPrepare: recipe.timeToPrepare,
      instructions: recipe.instructions,
      servings: recipe.servings
    }

    } catch(err) {
      await db.run('ROLLBACK');
      throw err;
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

// export const getIngredientByName = async (name: string): Promise<Ingredient | undefined> => {
//   const db = getDb();
//   return db.get(`SELECT id, name
//                 FROM Ingredients
//                 WHERE name = ?;`, name);
// }
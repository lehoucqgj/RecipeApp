import express from 'express';
import { createRecipeWithIngredients, getAllRecipes, getRecipeById, deleteRecipeById, getIngredientsByRecipeId } from '../db/queries.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Recipe API is running');
});

//TODO: implement error handling middleware

// router.post('/recipes', async (req, res, next) => {
//   const { name, timeToPrepare, instructions, servings } = req.body;
//   try {
//     const newRecipe = await createRecipe({name, timeToPrepare, instructions, servings});
//     res.status(201).json(newRecipe);
//   } catch (err) {
//     next(err);
//   }
// });

// router.post('/recipes/ingredient', async (req, res, next) =>{
//   try{
//     const { recipeId, ingredientId, quantity, quantifier } = req.body;
//     const newRecipeIngredient = await addIngredient({recipeId, ingredientId, quantity, quantifier});
//     res.status(201).json(newRecipeIngredient);
//   } catch(err){
//     next(err);
//   }
// });

router.post('/recipes/with-ingredients', async (req, res, next) => {
  const {recipe, ingredients} = req.body;
  try{
    const newRecipe = await createRecipeWithIngredients(recipe, ingredients);
    res.status(201).json(newRecipe);
  } catch(err){
    next(err);
  }
});

router.get('/recipes', async (req, res, next) => {
  try {
    const recipes = await getAllRecipes();
    res.json(recipes);
  } catch (err) {
    next(err);
  }
});

router.get('/recipes/:id', async (req, res, next) => {
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

router.delete('/recipes/:id', async (req, res, next) => {
  const recipeId = parseInt(req.params.id as string);
  try{
    await deleteRecipeById(recipeId);
    res.status(204).send();
  }catch(err){
    next(err);
  }
});

router.get('/recipes/:id/ingredients', async (req, res) =>{
  const recipeId = parseInt(req.params.id as string);
  try{
    const ingredients = await getIngredientsByRecipeId(recipeId);
    res.json(ingredients);
  }catch(err){
    console.log("error getting ingredients for this recipe");
  }
});

// router.get('/ingredient/:name', async (req, res) =>{
//   const ingredientName = req.params.name;
//   try{
//     const ingredient = await getIngredientByName(ingredientName);
//     res.json(ingredient);
//   } catch{
//     console.log("error getting ingredient with that name");
//   }
// });

export default router;
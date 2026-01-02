import express from 'express';
import { createRecipeWithIngredients, getAllIngredients, getAllRecipes, getRecipeById, deleteRecipeById, getIngredientsByRecipeId, createIngredient } from '../db/queries.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Recipe API is running');
});

//TODO: implement error handling middleware
//TODO: Probably should make multiple routes files
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

router.get('/recipes/:id/ingredients', async (req, res, next) =>{
  const recipeId = parseInt(req.params.id as string);
  try{
    const ingredients = await getIngredientsByRecipeId(recipeId);
    res.json(ingredients);
  }catch(err){
    next(err);
  }
});

// can likely be used to update ingredients later on
// router.get('/ingredient/:name', async (req, res, next) =>{
//   const ingredientName = req.params.name;
//   try{
//     const ingredient = await getIngredientByName(ingredientName);
//     res.json(ingredient);
//   } catch(err) {
//     next(err);
//   }
// });

router.get('/ingredients', async (req, res, next) => {
  try {
    const ingredients = await getAllIngredients();
    res.json(ingredients);
  } catch (err) {
    next(err);
  }
});


router.post('/ingredient', async (req, res, next) => {
  const ingredient = req.body;
  try {
    const newIngredient = await createIngredient(ingredient);
    res.status(201).json(newIngredient);
  } catch(err){
    next(err);
  }
})

export default router;


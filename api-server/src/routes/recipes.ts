import express from 'express';
import { createRecipe, getAllRecipes, getRecipeById, deleteRecipeById } from '../db/queries.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Recipe API is running');
});

//TODO: implement error handling middleware

router.post('/recipes', async (req, res, next) => {
  const { name, time_to_prepare } = req.body;
  try {
    const newRecipe = await createRecipe({name, time_to_prepare});
    res.status(201).json(newRecipe);
  } catch (err) {
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

export default router;
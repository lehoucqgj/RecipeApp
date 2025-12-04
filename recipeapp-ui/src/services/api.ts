import type { Recipe, Ingredient } from '../types';
const API_URL = 'http://localhost:3000';

async function getAllRecipes<Recipe>(endpoint:string): Promise<Recipe> {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

async function getAllRecipeIngredients<Ingredient>(endpoint:string): Promise<Ingredient>{
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export const recipeApi = {
    getAllRecipes: () => getAllRecipes<Recipe[]>('/recipes'),
    getAllRecipeIngredients: (id: number) => getAllRecipeIngredients<Ingredient[]>(`/recipes/${id}/ingredients`)
};
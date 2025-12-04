import type { Recipe, Ingredient } from '../types';
const API_URL = 'http://localhost:3000';

async function get<T>(endpoint:string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export const recipeApi = {
    getAllRecipes: () => get<Recipe[]>('/recipes'),
    getAllRecipeIngredients: (id: number) => get<Ingredient[]>(`/recipes/${id}/ingredients`)
};
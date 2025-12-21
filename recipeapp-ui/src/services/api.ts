import type { Recipe, RecipeIngredientDetails, Ingredient } from '../types';
const API_URL = 'http://localhost:3000';

async function get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

async function post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export const recipeApi = {
    getAllRecipes: () => get<Recipe[]>('/recipes'),
    getAllRecipeIngredients: (id: number) => get<RecipeIngredientDetails[]>(`/recipes/${id}/ingredients`),
    createRecipe: (data: Recipe) => post<Recipe>('/recipes', data),

    getIngredientByName: (name: string) => get<Ingredient>(`/ingredient/${name}`),
    addRecipeIngredient: (data: RecipeIngredientDetails) => post<RecipeIngredientDetails>(`/recipes/ingredient`, data)
};
import type { Recipe, /*ShoppingListItem*/ } from '../types';
const API_URL = 'http://localhost:3000';

async function get<Recipe>(endpoint:string): Promise<Recipe> {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export const recipeApi = {
    getAllRecipes: () => get<Recipe[]>('/films')
}
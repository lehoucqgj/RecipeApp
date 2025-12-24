export interface Recipe {
    id?: number;
    name: string;
    timeToPrepare: number;
    instructions?: string;
    servings?: number;
}

// export interface RecipeIngredient {
//     recipeId: number;
//     ingredientId: number;
//     quantity: number;
//     quantifier: string;
// }

export interface RecipeIngredientInput {
    name: string;
    quantity: number;
    quantifier: string;
}

export interface RecipeIngredientDetails {
    recipeId?: number;
    ingredientId?: number;
    name: string;
    quantity: number;
    quantifier: string;
}

export interface Ingredient {
    id?: number;
    name: string;
}

export interface createRecipeWithIngredientsData {
    recipe: Recipe
    ingredients: RecipeIngredientDetails[]; 
}
export interface Recipe {
    id?: number;
    name: string;
    timeToPrepare: number;
    instructions?: string;
    servings?: number;
}

export interface RecipeIngredient {
    recipeId: number;
    ingredientId: number;
    quantity: number;
    quantifier: string;
}

export interface RecipeIngredientDetails {
    id?: number;
    name: string;
    quantity: number;
    quantifier: string;
}
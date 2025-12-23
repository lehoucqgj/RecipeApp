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

// this one can go after refactor i think.
export interface RecipeIngredientInput {
    name: string;
    quantity: number;
    quantifier: string;
}

//TODO: used in RecipeList component, check if one of the other types can be used.
export interface RecipeIngredientDetails {
    id?: number;
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
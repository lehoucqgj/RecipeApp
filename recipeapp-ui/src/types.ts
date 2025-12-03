export interface Recipe {
    id?: number;
    name: string;
    time_to_prepare: number;
}

export interface Ingredient {
    id?: number;
    name: string;
    quantity: number;
    quantifier: string;
}
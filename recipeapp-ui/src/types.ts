export interface Recipe {
    id?: number;
    name: string;
    time_to_prepare: number;
}

export interface ShoppingListItem {
    id?: number;
    name: string;
    quantity: string;    
}
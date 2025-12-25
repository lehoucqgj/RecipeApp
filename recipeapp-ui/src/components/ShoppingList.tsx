import type { RecipeIngredientDetails } from "../types";

interface ShoppingListProps {
    items: RecipeIngredientDetails[];
}

export const SchoppingList = ({ items }: ShoppingListProps) => {
    return (
        <>
            <h1>Your shopping list for this week</h1>
            <div>
                {items.length === 0? (
                    <p>No items in your shoppinglist.</p>
                ) : (
                    <ul>
                        {items.map((item) => (
                            <li key={`${item.recipeId}-${item.ingredientId}`}>
                                {item.name}: {item.quantity} {item.quantifier}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
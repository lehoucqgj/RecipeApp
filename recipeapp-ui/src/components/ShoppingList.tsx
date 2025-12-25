import type { RecipeIngredientDetails } from "../types";

interface ShoppingListProps {
    items: RecipeIngredientDetails[];
}

export const SchoppingList = ({ items }: ShoppingListProps) => {
    const groupIngredients = (items: RecipeIngredientDetails[]) => {
        const grouped = items.reduce((acc, item) => {
            if(!acc[item.name]){
                acc[item.name] = {...item};
            } else {
                acc[item.name].quantity += item.quantity;
            }
            return acc;
        }, {} as Record<string, RecipeIngredientDetails>);
        return Object.values(grouped);
    }

    const groupedIngredients = groupIngredients(items);

    return (
        <>
            <h1>Your shopping list for this week</h1>
            <div>
                {items.length === 0? (
                    <p>No items in your shoppinglist.</p>
                ) : (
                    <ul>
                        {groupedIngredients.map((item) => (
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
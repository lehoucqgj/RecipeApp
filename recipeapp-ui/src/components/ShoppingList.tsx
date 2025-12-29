import type { RecipeIngredientDetails } from "../types";

interface ShoppingListProps {
    items: RecipeIngredientDetails[];
}

export const SchoppingList = ({ items }: ShoppingListProps) => {
    const groupIngredients = (items: RecipeIngredientDetails[]) => {
        const grouped = items.reduce((acc, item) => {
            const key = `${item.name}-${item.quantifier}`;
            if(!acc[key]){
                acc[key] = {...item};
            } else {
                acc[key].quantity += item.quantity;
            }
            return acc;
        }, {} as Record<string, RecipeIngredientDetails>);
        return Object.values(grouped);
    }

    const groupedIngredients = groupIngredients(items);

    return (
        <>
            <h1 className="my-1 text-3xl mb-10 border-b border-fuchsia-800 pb-4 text-[#fafafa]">Your shopping list for this week</h1>
            <div>
                {items.length === 0? (
                    <p className="text-[#fafafa]">No items in your shoppinglist.</p>
                ) : (
                    <ul className="text-[#fafafa]">
                        {groupedIngredients.map((item) => (
                            <li key={`${item.recipeId}-${item.ingredientId}`}>
                                - {item.name}: {item.quantity} {item.quantifier}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
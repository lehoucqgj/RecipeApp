import { type Recipe, type RecipeIngredientDetails } from "../types";

interface RecipeCoponentProps{
    recipe: Recipe;
    ingredients: RecipeIngredientDetails[];
    isExpanded: boolean;
    onRecipeClick: (id: number) => void;
    onAddClick: (id: number) => void;
}

export const RecipeComponent = ({
    recipe,
    ingredients,
    isExpanded,
    onRecipeClick,
    onAddClick }: RecipeCoponentProps) => {
    return (
            <div className="m-2 p-1 border rounded-xl border-[#121918] bg-[#242b38] self-start">
            {/*clickable thingy*/}
                <div
                    className="pb-1 font-bold cursor-pointer text-[#DCF938]"
                    onClick={() => recipe.id && onRecipeClick(recipe.id)}
                >
                    {recipe.name} {recipe.timeToPrepare && ` - ${recipe.timeToPrepare}`}
                </div>

                { isExpanded && (
                    <>
                    <div className="container flex justify-center my-2 border-t border-b pb-3 border-[#121918] pt-2">
                        <ul className="flex-1 text-center text-[#e3e5e5]">
                            {ingredients.map(ingr => (
                                <li key={`${ingr.ingredientId}-${recipe.id}`}>
                                {ingr.name} - {ingr.quantity} {ingr.quantifier}
                            </li>
                            ))}
                        </ul>
                    </div>

                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            if(recipe.id){
                                onAddClick(recipe.id);
                            }
                        }}
                        >Add
                </button>
                </>
            )}
        </div>
    )
}
            
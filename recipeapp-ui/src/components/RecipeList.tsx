import { useState, useEffect } from "react";
import { type RecipeIngredientDetails, type Recipe } from "../types";
import { recipeApi } from "../services/api";
import { RecipeComponent } from "./RecipeComponent";

interface RecipeListProps{
  shoppinglist: RecipeIngredientDetails[];
  setShoppinglist: React.Dispatch<React.SetStateAction<RecipeIngredientDetails[]>>
}

export const RecipeList = ({ shoppinglist: shoppinglist, setShoppinglist }: RecipeListProps) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [ingredients, setIngredients] = useState<RecipeIngredientDetails[]>([]);
    const [expandedRecipeId, setExpandedRecipeId] = useState<number | null>(null);
    const [recipeCount, setRecipeCount] = useState(0);

    useEffect(() => {
        // show all recipes on site load.
        const fetchRecipes = async () => {
            try{
                setLoading(true);
                const data = await recipeApi.getAllRecipes();
                setRecipes(data);
                setError(null);
            }catch(err){
                setError('Failed to load recipes');
                console.error(err);
            }finally{
                setLoading(false);
            }
        };
        fetchRecipes();       
    },[]);

  // To check up on them datas
  useEffect(() => {
    console.log("Updated shopping list:", shoppinglist);
  }, [shoppinglist]);

    if(loading) return <div className="text-gray-300">Loading</div>;
    if(error) return <div className="text-red-600">Error: {error}</div>;
    

    const handleRecipeClick = async (recipeId: number) => {
      if (expandedRecipeId === recipeId){
        setExpandedRecipeId(null);
        setIngredients([]);
        return;
      }

      setExpandedRecipeId(recipeId);

      try{
          setLoading(true);
          const data = await recipeApi.getAllRecipeIngredients(recipeId);
          setIngredients(data);
          setError(null);
      } catch(err){
          setError('No ingredients loaded');
          console.log(err)
      } finally{
          setLoading(false);
      }
    }

    const addBtnClick = async (id: number) => {
      const containsRecipe = shoppinglist.some(item => item.recipeId === id);
      //TODO: Give a warning to the user to, not just the console.
      if (containsRecipe){
        console.warn(`Recipe already in the weekmenu.`);
        return;
      }
      if (recipeCount >= 7){
        console.warn('You already selected 7 recipes');
        return;
      }
      const data = await recipeApi.getAllRecipeIngredients(id);
      const ingredientWithRecipeId = data.map(ingr => ({
        ...ingr,
        recipeId: id
      }));
      setShoppinglist(prev => [...prev, ...ingredientWithRecipeId]);
      setRecipeCount(recipeCount + 1);
    }

return (
  <div className="text-gray-300">
      <h2 className="my-1 text-3xl mb-4">Recipes</h2>
      <div className="grid grid-cols-2 gap-4 ">
        {recipes.map(r => (
          <RecipeComponent
            key={r.id}
            recipe={r}
            ingredients={r.id === expandedRecipeId ? ingredients : []}
            isExpanded={r.id === expandedRecipeId}
            onRecipeClick={handleRecipeClick}
            onAddClick={addBtnClick}
          />
        ))}
      </div>
    </div>
);


};
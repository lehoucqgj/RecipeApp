import { useState, useEffect } from "react";
import { type RecipeIngredientDetails, type Recipe } from "../types";
import { recipeApi } from "../services/api";

export const RecipeList = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [ingredients, setIngredients] = useState<RecipeIngredientDetails[]>([]);
    const [expandedRecipeId, setExpandedRecipeId] = useState<number | null>(null);
    const [shoppinglist, setShoppinglist] = useState<RecipeIngredientDetails[]>([]);

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
      //TODO: Write validation to check for duplicate recipes
        const data = await recipeApi.getAllRecipeIngredients(id);
        setShoppinglist(prev => [...prev, ...data]);
    }

return (
  <div className="text-gray-300">
    <h2 className="my-1 text-3xl">Recipes</h2>
    <ul>
      {recipes.map(r => (
        <li key={r.id}>
          {/* The clickable recipe name */}
          <div 
            onClick={() => r.id && handleRecipeClick(r.id)}
            className="cursor-pointer hover:bg-blue-700 p-2"
          >
            {r.name} - {r.timeToPrepare}
          </div>
          
          {/* This part shows ONLY when the recipe is expanded */}
          {r.id && expandedRecipeId === r.id && (
            <div className="ml-4 mt-2 p-2 bg-gray-800">
              <p>Ingredients for {r.name}:</p>
              <ul>
                {ingredients.map (ing => (
                  <li key={ing.id}>
                    {ing.name}: {ing.quantity} {ing.quantifier}
                  </li>
                ))}
              </ul>
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => r.id && addBtnClick(r.id)}>Add</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  </div>
);


};
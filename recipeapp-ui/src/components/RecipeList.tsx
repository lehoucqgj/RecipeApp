import { useState, useEffect } from "react";
import { type Ingredient, type Recipe } from "../types";
import { recipeApi } from "../services/api";

export const RecipeList = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [expandedRecipes, setExpandedRecipes] = useState<Record<number, boolean>>({});

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
        console.log(ingredients)
    }, [ingredients]);

    if(loading) return <div className="text-gray-300">Loading</div>;
    if(error) return <div className="text-red-600">Error: {error}</div>;
    

    const handleRecipeClick = async (recipeId: number) => {
        //expand the recipe
        setExpandedRecipes(prev => ({
            ...prev,
            [recipeId]: !prev[recipeId]
        }));

        //put ingredients for that recipe in a collection.
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
            {r.name} - {r.time_to_prepare}
          </div>
          
          {/* This part shows ONLY when the recipe is expanded */}
          {r.id && expandedRecipes[r.id] && (
            <div className="ml-4 mt-2 p-2 bg-gray-800">
              <p>Mock ingredients for {r.name}</p>
            </div>
          )}
        </li>
      ))}
    </ul>
  </div>
);


};
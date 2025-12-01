import { useState, useEffect } from "react";
import type { Recipe } from "../types";
import { recipeApi } from "../services/api";

export const RecipeList = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [recipe, setRecipe] = useState<Recipe>();

    // const addToIngredientList = (recipe: Recipe) => {
    //     setRecipe(recipe);
        
    // }

    useEffect(() => {
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

     if(loading) return <div className="text-gray-300">Loading</div>;
     if(error) return <div className="text-red-600">Error: {error}</div>;

     return (<div className="text-gray-300">
        <h2 className=" my-1 text-3xl">Recipes</h2>
        <ul>
            {recipes.map(r => (
                //TODO: pass recipe to other compontent or make ingredient list here and pass that.
                //TODO: Add recipe details to DB
                //TODO: Make onClick expand the recipe and show said details.
                <li 
                    key={r.id} 
                    onClick={() => {
                        setRecipe(r);
                        console.log(recipe?.name); //shows previous one on click. needs useState(overkill imo)
                    }}
                    className="cursor-pointer hover:bg-blue-700"
                >
                    {r.name} - {r.time_to_prepare}
                </li>
            ))}
        </ul>
     </div>
     );


};
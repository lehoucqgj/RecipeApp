import React, { useState, useEffect } from "react";
import { type Recipe, type RecipeIngredientInput } from "../types"
import { recipeApi } from "../services/api";

const inputRowStyle = "flex flex-row justify-center my-2 " 
const inputBoxStyle = "flex-1 border border-gray-700 px-1.5 rounded-md"

export const AddRecipe = () => {   
    const [recipeFormData, setRecipeFormData] = useState<Recipe>({
        name: '',
        timeToPrepare: 0,
        instructions: '',
        servings: 0
    });
    const [ingredientsFormData, setIngredientsFormData] = useState<RecipeIngredientInput>({
        name: '',
        quantity: 0,
        quantifier: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [step, setStep] = useState(1);
    
    const [ingredientList, setIngredientList] = useState<RecipeIngredientInput[]>([]);
    
    // TODO: check out to change stepstate stuff to components.
    // TODO: add other component or stepstate for adding ingredient to the database. (should really look into multiple components and refactor)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        if (step === 1){
            setRecipeFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
        else if (step === 2){
            setIngredientsFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };
    
    const createRecipe = () => {
        setError(null);
            if(!recipeFormData.name || recipeFormData.timeToPrepare <= 0){
                setError("Please fill in name and time to prepare (required fields).");
                setLoading(false);
                return
            }
            setStep(2);
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            setLoading(true);
            setError(null);
            const ingredients = ingredientList.map(ingr => ({
                name: ingr.name,
                quantity: ingr.quantity,
                quantifier: ingr.quantifier
            }));
            await recipeApi.createRecipeWithIngredients({
                recipe: recipeFormData,
                ingredients: ingredients
            })
        } catch(err) {
            setError("Failed to create Recipe");
            console.log(err);
        } finally {
            (setLoading(false))
        }
    }

    const AddIngredient = () => {
        setError(null);
        if (!ingredientsFormData.name || ingredientsFormData.quantity <= 0 || !ingredientsFormData.quantifier){
            setError("Please fill in all required fields");
            return
        }
        if (ingredientList.some(ingr => ingr.name === ingredientsFormData.name)){
            setError("Duplicate ingredient.");
            return
        }
        setIngredientList(prev => [...prev, ingredientsFormData]);
    }

    // checking up on them datas
    useEffect(() => {
        console.log(ingredientList);
    }, [ingredientList]);


    return (
        
        <>
            <h1 className="text-[#fafafa] my-1 text-3xl mb-10 border-b border-fuchsia-800 pb-4">Here you can add new recipes to your cookbook</h1>
            {step === 1 && (
                <form>
                <h2 className="text-xl mb-6 text-[#fafafa]" >Add Recipe</h2>
                {error && <div className="text-red-700">{error}</div>}
                <div className="flex flex-col w-2/5 mx-auto text-[#fafafa]">
                    <div className={inputRowStyle}>
                        <label className="flex-1">Recipe Name:</label>
                        <input 
                            type="text"
                            name="name"
                            value={recipeFormData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            required
                            className={inputBoxStyle}
                            />
                    </div>
                    <div className={inputRowStyle}>
                        <label className="flex-1">Time to prepare: </label>
                        <input 
                            type="number"
                            name="timeToPrepare"
                            value={recipeFormData.timeToPrepare}
                            onChange={handleChange}
                            placeholder="0"
                            required
                            className={inputBoxStyle}
                            />
                    </div>

                    <div className={inputRowStyle}>
                        <label className="flex-1">Instructions: </label>
                        <textarea
                            name="instructions"
                            value={recipeFormData.instructions}
                            onChange={handleChange}
                            placeholder="Instructions"
                            rows={5}
                            className={inputBoxStyle}
                            />
                    </div>

                    <div className={inputRowStyle}>
                        <label className="flex-1">Servings: </label>
                        <input 
                            type="number"
                            name="servings"
                            value={recipeFormData.servings}
                            onChange={handleChange}
                            placeholder="0"
                            className={inputBoxStyle}
                            />
                    </div>

                    <button type="button" disabled={loading}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-3/4 mx-auto mt-6"
                        onClick={createRecipe}>
                        Next: Add ingredients
                    </button>

                </div>
            </form>
            )}

            {step === 2 &&(
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col w-2/5 mx-auto">
                        <h2>Add ingredients</h2>

                        <input 
                            type="text"
                            name="name"
                            value={ingredientsFormData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            required
                        />
                        <input 
                            type="number"
                            name="quantity"
                            value={ingredientsFormData.quantity}
                            onChange={handleChange}
                            placeholder="Quantity"
                            required
                        />
                        <input 
                            type="text"
                            name="quantifier"
                            value={ingredientsFormData.quantifier}
                            onChange={handleChange}
                            placeholder="Quantifier"
                            required
                        />

                        <div>
                            <ul> List of selected ingredients
                                {ingredientList.map (ingr => (
                                    <li key={ingr.name}>
                                        {ingr.name}: {ingr.quantity} {ingr.quantifier}
                                    </li>
                                ))}
                            </ul>
                            {error && <div className="text-red-700">{error}</div>}
                            <button type="button" disabled={loading}
                                onClick={AddIngredient}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Add Ingredient
                            </button>
                        </div>

                        <button type="submit" disabled={loading}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {loading ? 'Creating...' : 'Create Recipe'}
                        </button>
                    </div>
                </form>
            )}
        </>
    );
}
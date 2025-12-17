import React, { useState } from "react";
import { type Recipe, type RecipeIngredient, type RecipeIngredientInputDto } from "../types"
import { recipeApi } from "../services/api";

export const AddRecipe = () => {
    const [step, setStep] = useState(1);
    const [recipeId, setRecipeId] = useState<number>();

    const [recipeFormData, setRecipeFormData] = useState<Recipe>({
        name: '',
        timeToPrepare: 0,
        instructions: '',
        servings: 0
    });
    const [ingredientsFormData, setIngredientsFormData] = useState<RecipeIngredientInputDto>({
        name: '',
        quantity: 0,
        quantifier: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    //TODO: might be better to use a regular button?
    const handleRecipeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            
            console.log(recipeFormData);
            setStep(2);
        } catch(err) {
            setError("Failed to create Recipe");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleIngredientSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            setLoading(true);
            setError(null);

            const newRecipe = await recipeApi.createRecipe(recipeFormData);
            setRecipeId(newRecipe.id);

            //TODO: write the list of ingredients to the database, using the recipeId above.

        } catch(err) {
            setError("Failed to create Recipe")
        } finally {
            (setLoading(false))
        }

    }

    const AddIngredient = () => {
        throw new Error("Function not implemented.");
    }

    return (
        <>
            <h1>Here you can add new recipes to your cookbook</h1>
            {step === 1 && (

                <form onSubmit={handleRecipeSubmit}>
                <h2>Add Recipe</h2>
                {error && <div className="text-red-700">{error}</div>}
                <div className="flex flex-col w-2/5 mx-auto">
                    <input 
                        type="text"
                        name="name"
                        value={recipeFormData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                        />
                    <input 
                        type="number"
                        name="timeToPrepare"
                        value={recipeFormData.timeToPrepare}
                        onChange={handleChange}
                        placeholder="0"
                        required
                        />
                    <input
                    //TODO: Make this textfield bigger and allow return, so you can write it down structured
                    // or add a 'next instruction button'
                        type="text"
                        name="instructions"
                        value={recipeFormData.instructions}
                        onChange={handleChange}
                        placeholder="Instructions"
                        />
                    <input 
                        type="number"
                        name="servings"
                        value={recipeFormData.servings}
                        onChange={handleChange}
                        placeholder="0"
                        />

                    <button type="submit" disabled={loading}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {loading ? 'Creating...' : 'Next: Add ingredients'}
                    </button>

                </div>
            </form>
            )}
            {step === 2 &&(
                <form onSubmit={handleIngredientSubmit}>
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
                            placeholder="Name"
                            required
                        />
                        <input 
                            type="text"
                            name="quantifier"
                            value={ingredientsFormData.quantifier}
                            onChange={handleChange}
                            placeholder="Name"
                            required
                        />

                        <div>
                            <ul> List of selected ingredients
                                
                            </ul>
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
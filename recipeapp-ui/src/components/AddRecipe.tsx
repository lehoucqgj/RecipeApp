import React, { useState } from "react";
import { type Recipe, type RecipeIngredientDetails } from "../types"
import { recipeApi } from "../services/api";

export const AddRecipe = () => {

    const [formData, setFormData] = useState<Recipe>({
        name: '',
        timeToPrepare: 0,
        instructions: '',
        servings: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError(null);

            // const newRecipe = await recipeApi.
        } catch(err) {
            setError("Failed to create recipe");
        } finally {
            setLoading(false);
        }

    };

    return (
        <>
            <h1>Here you can add new recipes to your cookbook</h1>
            <form onSubmit={handleSubmit}>
                <h2>Add Recipe</h2>
                {error && <div className="text-red-700">{error}</div>}
                <div className="flex flex-col w-2/5 mx-auto">
                    <input 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                        />
                    <input 
                        type="number"
                        name="timeToPrepare"
                        value={formData.timeToPrepare}
                        onChange={handleChange}
                        placeholder="0"
                        required
                        />
                    <input
                        type="text"
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        placeholder="Instructions"
                        />
                    <input 
                        type="number"
                        name="servings"
                        value={formData.servings}
                        onChange={handleChange}
                        placeholder="0"
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? 'Creating...' : 'Add recipe'}
                    </button>

                </div>
            </form>
        </>
    );
}
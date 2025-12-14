import React, { useState } from "react";
import { type Recipe, type RecipeIngredientDetails } from "../types"
import { recipeApi } from "../services/api";

export const AddRecipe = (/*{onRecipeCreated}: Props*/) => {

    const [formData, setFormData] = useState<Recipe>({
        name: '',
        timeToPrepare: 0
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
        </>
    );
}
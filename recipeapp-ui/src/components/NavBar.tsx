import { Link } from "react-router-dom";

export const NavBar = () => {
    return (
        <nav className="bg-white shadow dark:bg-gray-800">
    <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
        <p className="text-gray-800 dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6">
            <Link to="/">Home</Link></p>

        <p className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">
            <Link to="/RecipeList">Recipes</Link></p>

        <p className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">
            <Link to="/ShoppingList">Shopping List</Link></p>

        <p className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">
            <Link to="/AddRecipe">Add Recipe</Link></p>
    </div>
</nav>
    );
};
import { Link, useLocation } from "react-router-dom";

export const NavBar = () => {
    const location = useLocation();
    const links = [
        {to: "/", label: "Home"},
        {to:"/RecipeList" , label:"Recipes" },
        {to:"/ShoppingList" , label:"Shopping List" },
        {to:"/AddRecipe" , label:"Add Recipe" }
    ];

    return (
        <nav>
            <div className="container flex items-center justify-center p-6 mx-auto text-[#fafafa] text-2xl mb-2">
                {links.map(link =>(
                    <p  key={link.to}
                        className={`border-b-2 mx-1.5 sm:mx-6 ${
                            location.pathname === link.to
                                ? "text-[#e6f2f1] border-fuchsia-800"
                                : "border-transparent hover:text-[#e3e5e5] hover:border-fuchsia-800"
                        }`}>
                        <Link to={link.to}>{link.label}</Link>
                    </p>
                ))}
            </div>
        </nav>
    )



};
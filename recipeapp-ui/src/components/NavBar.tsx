import { Link, useLocation } from "react-router-dom";
import { Home } from "./Home";

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
            <div className="container flex items-center justify-center p-6 mx-auto text-[#E1CA96]">
                {links.map(link =>(
                    <p  key={link.to}
                        className={`border-b-2 mx-1.5 sm:mx-6 ${
                            location.pathname === link.to
                                ? "text-[#dbbc74] border-[#9E0031]"
                                : "border-transparent hover:text-[#e0cfa8] hover:border-[#9E0031]"
                        }`}>
                        <Link to={link.to}>{link.label}</Link>
                    </p>
                ))}
            </div>
        </nav>
    )



};
export const Home = () => {
    return (
        <>
            <h1 className="my-1 text-3xl mb-10 border-b border-fuchsia-800 pb-4 text-[#fafafa]">Welcome</h1>
            <div className="text-[#fafafa] w-3/5 mx-auto">
                <p className="mb-8"><span className="font-bold text-lg text-[#D4CB6A]">Transform the way you plan your meals</span> with our intuitive recipe and shopping list app! Designed to simplify your weekly routine, 
                    this tool allows you to select up to seven recipes from our curated database and instantly generates a complete shopping list. 
                    No more wandering the aisles trying to remember what you need - everything is organized and ready to go.</p>

                <p className="mb-8"><span className="font-bold text-lg text-[#D4CB6A]"> Our recipe database features a variety of dishes </span>to suit different tastes and dietary preferences. 
                    Can't find exactly what you're looking for? That's where the 'Add Recipe' tab comes in. You have full control to create and customize your own recipes, 
                    adding ingredients with specific quantities, preparation instructions, cooking times, and serving sizes. 
                    Every recipe you create becomes part of your personal collection, ready to be used in future meal plans. </p>

                <p className="mb-8"><span className="font-bold text-lg text-[#D4CB6A]">The app is built to save you time</span>, reduce stress, and help you maintain a well-organized kitchen. 
                    Whether you're meal prepping for a busy week, trying to eat healthier, or simply want to avoid the daily "what's for dinner?" 
                    dilemma, we've got you covered. Start planning smarter, shopping faster, and cooking with confidence!</p>
            </div>
        </>
    );
}
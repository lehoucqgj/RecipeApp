

export const RecipeComponent = () => {
    const pinkClass = "text-[#F0D3F7]";
    return (
        <>
            <div className="m-2 p-1 w-1/2 border rounded-xl border-[#9e0031] bg-[#1c2737]">
                <p className="pb-1 font-bold text-[#dbbc74] border-b border-[#9e0031]">Everzwijnragout</p>
                <p className={pinkClass}>uitleg</p>
                <p className={pinkClass}>nog wa uitleg</p>
                <div className="container flex  justify-center my-2">
                    <ul className="flex-1 text-center text-[#F0D3F7]">
                        <li>patat</li>
                        <li>tonijn</li>
                    </ul>
                    <ul className="flex-1 text-center text-[#F0D3F7]">
                        <li>5</li>
                        <li>1 kg</li>
                    </ul>
                </div>
            </div>
        </>
    )
}
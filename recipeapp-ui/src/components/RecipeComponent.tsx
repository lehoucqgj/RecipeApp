

export const RecipeComponent = () => {
    const pinkClass = "text-[#e3e5e5]";
    return (
        <>
            <div className="m-2 p-1 w-1/2 border rounded-xl border-[#121918] bg-[#242b38]">
                <p className="pb-1 font-bold text-fuchsia-800 border-b border-[#121918]">Everzwijnragout</p>
                <p className={pinkClass}>uitleg</p>
                <p className={pinkClass}>nog wa uitleg</p>
                <div className="container flex  justify-center my-2 border-t border-[#121918]">
                    <ul className="flex-1 text-center text-[#e3e5e5]">
                        <li>patat</li>
                        <li>tonijn</li>
                    </ul>
                    <ul className="flex-1 text-center text-[#e3e5e5]">
                        <li>5</li>
                        <li>1 kg</li>
                    </ul>
                </div>
            </div>
        </>
    )
}
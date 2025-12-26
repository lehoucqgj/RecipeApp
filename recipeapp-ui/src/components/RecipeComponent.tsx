

export const RecipeComponent = () => {
    const pinkClass = "text-[#e3e5e5]";
    return (
        <>
            <div className="m-2 p-1 w-1/2 border-2 rounded-xl border-[#1b4c48] bg-[#242b38]">
                <p className="pb-1 font-bold text-[#e6f2f1] border-b-2 border-[#1b4c48]">Everzwijnragout</p>
                <p className={pinkClass}>uitleg</p>
                <p className={pinkClass}>nog wa uitleg</p>
                <div className="container flex  justify-center my-2 border-t-2 border-[#1b4c48]">
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
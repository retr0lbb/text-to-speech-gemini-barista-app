interface ToggleMenuProps {
    isVisible?: boolean,
    onButtonClick: () => void
}

export function ToggleMenu({onButtonClick, isVisible}: ToggleMenuProps){
    return(
        <div className={`flex flex-col absolute left-0 mt-[90px] h-full items-center justify-center bg-whiteDickColor border border-twinkyBrown p-4 ${isVisible? "translate-x-0": "-translate-x-[200%]"}`}>
            <button className="bg-amber-500 hover:bg-amber-900 px-2 py-1.5 text-xl text-white rounded-lg" onClick={onButtonClick}>
                Trocar modo
            </button>
        </div>
    )
}
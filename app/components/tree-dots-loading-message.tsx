
interface ThreeDotsLoaderProps{
    isFromYou?: boolean
}

export function ThreeDotsLoader({isFromYou}: ThreeDotsLoaderProps){
    return(
        <div className={`flex items-center ${isFromYou? "justify-end": "justify-start"} gap-2 px-4 py-2`}>
            <div className="size-2 rounded-full bg-amber-900 animate-bounceFast" />
            <div className="size-2 rounded-full bg-amber-900 animate-bounceMedium" />
            <div className="size-2 rounded-full bg-amber-900 animate-bounceSlow" />
        </div>
    )
}
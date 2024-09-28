import { AudioButton } from "./audio-button"
export interface MessageProps {
    isFromYou?: boolean,
    content: string
    audioId?: string
}

export function Message({isFromYou, content, audioId}: MessageProps){
    return(
        <div className={`flex items-center ${isFromYou && "justify-end"} p-2 text-sm w-full relative `}>
            {!isFromYou && <div className="absolute top-0 left-0 bg-teal-50 rounded-full size-8 grid place-items-center"><AudioButton audioID={audioId ?? ""} /></div>}
            <p className={`max-w-60 ${isFromYou?"bg-blue-300" :"bg-zinc-200"} p-4 ${!isFromYou && "mt-2"} rounded-xl ${isFromYou? "rounded-tr-none": "rounded-tl-none"}`}>{content}</p>
        </div>
    )
}
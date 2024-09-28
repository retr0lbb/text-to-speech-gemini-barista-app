
interface MessageProps {
    isFromYou?: boolean,
    content: string
}

export function Message({isFromYou, content}: MessageProps){
    return(
        <div className={`flex items-center ${isFromYou && "justify-end"} p-2 text-sm w-full `}>
            <p className={`max-w-60 ${isFromYou?"bg-blue-300" :"bg-zinc-200"} p-4 rounded-xl ${isFromYou? "rounded-tr-none": "rounded-tl-none"}`}>{content}</p>
        </div>
    )
}
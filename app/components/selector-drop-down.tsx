import React from "react";


interface DropDownMemesSigularityProps extends React.ComponentProps<"select"> {
}
export function DropDownMemesSigularity(props: DropDownMemesSigularityProps){
    return(
        <select name="pre-defined" id="selector-pre" className="flex flex-1 py-2 px-4 bg-transparent border rounded-full" {...props}>
            <option value="Me diga os melhores bares de Sp pra curtir com meus amigos">Me diga os melhores bares de Sp pra curtir com meus amigos</option>
            <option value="Não curto beber muito me de dicas de drinks sem alcool">não curto beber muito me de dicas de drinks sem alcool</option>
        </select>
    )
}
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";


interface DropDownMemesSigularityProps extends React.ComponentProps<"select"> {}
interface optionsType{
    prompt: string
}
export function DropDownMemesSigularity(props: DropDownMemesSigularityProps){
    const [validOptions, setValidOptions] = useState<optionsType[]>([])

    async function getPropts(){
        try {
            const response = await axios.get("/api/get-valid-prompts")

            const axiosResponse: optionsType[] = response.data

            const cleanArr = axiosResponse.filter((item, index, self) => index === self.findIndex((t) => t.prompt === item.prompt))
            setValidOptions(cleanArr)
        } catch (error) {
            throw error
        }
    }
    useEffect(() => {
        getPropts()
    }, [])
    return(
        <select name="pre-defined" id="selector-pre" className="flex flex-1 py-2 px-4 bg-transparent border rounded-full" {...props}>
            <option value=""></option>
            {validOptions.length > 0? (
                validOptions.map((item) => {
                    return(
                        <option value={item.prompt}>{item.prompt}</option>
                    )
                })
            ):""}
        </select>
    )
}
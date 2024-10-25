import { GenerateContentResult, GoogleGenerativeAI } from "@google/generative-ai"


const chatKey = "AIzaSyDhTbkMozvAGqFLQ2RPpB8dC3xQ7orDQa8"

if(!chatKey){
    throw new Error("No key found for google")
}
const genIa = new GoogleGenerativeAI(chatKey)
const model = genIa.getGenerativeModel({model: "gemini-1.5-flash"})


const initialChat = model.startChat({
    history: [
        {
            role: "user",
            parts: [{text: "você é um assistente pessoal barman que responde as duvidas sobre os bares da região do estado de são paulo, suas respostas tem que ser curtas no maximo 100 caracteres não coloque caracteres especias como emojis ou *, seja breve e amigavel tente usar as girias de são paulo para dar mais sotaque ao seu texto"}]
        }
    ]
})

export async function getGeneratedText(text: string): Promise<GenerateContentResult>{
    return await initialChat.sendMessage(text)
}
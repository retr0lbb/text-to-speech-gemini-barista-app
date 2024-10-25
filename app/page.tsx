"use client";
import { FormEvent, useState, useTransition } from "react";
import { Message, MessageProps } from "./components/message";
import { SendHorizonal } from "lucide-react";
import { getGeneratedText } from "@/app/utils/generate-text";
import axios from "axios";
import { DropDownMemesSigularity } from "./components/selector-drop-down";


export default function Home() {
  const [messages, setMessages] = useState<MessageProps[]>([{content: "Olá tudo bem? Eu sou o Barista e sou seu Barman pessoal dessa noite alguma pergunta sobre nosso estabelecimento", audioId: "0b2b7c03-e196-41f1-9b98-c8847b9f2f0b", isFromYou: false}])
  const [query, setQuery] = useState("")
  const [isPending, setIsPending] = useState(false)

  async function sendMessage( event: FormEvent<HTMLFormElement>){
    setIsPending(true)
    event.preventDefault()
    if(!query){
      return
    }
    try {
      const queryMessage = query
      setQuery("")


      setMessages(prev => [...prev, {isFromYou: true, content: queryMessage}])
      const { response } = await getGeneratedText(queryMessage)

      const result = await axios.post("/api", {
        text: response.text()
      })
      const voiceId = result.data.audioName


      setMessages(prev => [...prev, {content: response.text(), audioId: voiceId, isFromYou: false}])
    } catch (error) {
      throw error
    } finally{
      setIsPending(false)
    }

  }

  return (
    <section className="w-full h-screen bg-teal-50 flex items-center justify-center">
      <main className="border border-black rounded-lg p-5 min-w-[450px] flex flex-col items-center">
        <div className="w-full flex flex-1 flex-col gap-1 max-h-[500px] overflow-y-auto">
          {messages.map((item) => {
            return <Message content={item.content} key={item.audioId} audioId={item.audioId} isFromYou={item.isFromYou} />
          })}
        </div>

        <form onSubmit={sendMessage} className="flex w-full items-center justify-center gap-4 mt-5">
          {/* <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" className="flex flex-1 py-2 px-4 bg-transparent border rounded-full" /> */}
          <DropDownMemesSigularity onChange={e => setQuery(e.target.value)}/>
          <button disabled={isPending} className="p-2 bg-slate-600 hover:bg-slate-800 text-white rounded-lg flex items-center justify-center disabled:bg-slate-400">
            <SendHorizonal />
          </button>
        </form>
      </main>
    </section>
  );
}

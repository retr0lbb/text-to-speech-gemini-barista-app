"use client";
import { FormEvent, useState, useTransition } from "react";
import { Message, MessageProps } from "./components/message";
import { SendHorizonal, CameraOff, Paperclip } from "lucide-react";
import { getGeneratedText } from "@/app/api/utils/generate-text";
import axios from "axios";
import { DropDownMemesSigularity } from "./components/selector-drop-down";
import { ThreeDotsLoader } from "./components/tree-dots-loading-message";
import Image from "next/image";
import LogoBa from "@/app/static/LOGO-IABOA-SVG.svg"
import { ToggleMenu } from "./components/toggle-mode-menu";


export default function Home() {
  const [messages, setMessages] = useState<MessageProps[]>([{content: "Olá tudo bem? Eu sou o Barista e sou seu Barman pessoal dessa noite alguma pergunta sobre nosso estabelecimento", audioId: "0b2b7c03-e196-41f1-9b98-c8847b9f2f0b", isFromYou: false}])
  const [query, setQuery] = useState("")
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const [isOutOfTokens, setIsOutOfTokens] = useState(false)
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
        text: response.text(),
        prompt: queryMessage
      })
      const voiceId = result.data.audioName


      setMessages(prev => [...prev, {content: response.text(), audioId: voiceId, isFromYou: false}])
    } catch (error) {
      setIsOutOfTokens(true)
      throw error
    } finally{
      setIsPending(false)
    }

  }

  async function getTrivialMessagesInDatabase(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    if(isOutOfTokens === false){
      return
    }

    if(query !== ""){
      setMessages(prev => [...prev, {isFromYou: true, content: query}])
    }
    
    interface responseArrayProps {
      messageContent: string,
      messageId: string
      prompt: string,
      messageAudioPath: string
    }
    setIsPending(true)
    try {
      const resultAxiox = await axios.post("/api/database", {
        text: query
      })

      const arr: responseArrayProps[] = resultAxiox.data

      if(arr.length <= 0){
        return new Error("Our database cannot contain such a word")
      }

      const randomIndex = Math.floor(Math.random() * arr.length)

      setMessages(prev => [...prev, {content: arr[randomIndex].messageContent, audioId: arr[randomIndex].messageAudioPath, isFromYou: false}])

      
    } catch (error) {
      throw error
    }finally{
      setIsPending(false)
    }

  }

  return (
    <section className="w-full h-screen bg-amber-50 flex justify-center overflow-hidden">
      <main className="w-full flex flex-col gap-4 items-center">
        <div className="w-full bg-femboyOrange min-h-[90px] flex items-center justify-center py-2 relative">
          <h1 className="text-4xl font-bold"><Image className="size-16" src={LogoBa} alt="é a logo do iaboa" /></h1>
          <div className="size-10 absolute left-10 flex flex-col items-center justify-center gap-2 cursor-pointer" onClick={() => setIsMenuVisible(prev => !prev)}>
            <div className="w-full h-1 bg-orange-950 rounded-xl" />
            <div className="w-full h-1 bg-orange-950 rounded-xl" />
            <div className="w-full h-1 bg-orange-950 rounded-xl" />
          </div>
        </div>

        <ToggleMenu isVisible={isMenuVisible} onButtonClick={() => setIsOutOfTokens(prev => !prev)} />
        <div className="w-full md:max-w-[600px] flex flex-1 flex-col gap-1 overflow-y-scroll px-10">
          {messages.map((item) => {
            return <Message content={item.content} key={item.audioId} audioId={item.audioId} isFromYou={item.isFromYou} />
          })}
          {
            isPending? <ThreeDotsLoader isFromYou={false} /> : ""
          }
        </div>

        {isOutOfTokens=== true? (
          <form onSubmit={getTrivialMessagesInDatabase} className="flex w-full md:max-w-[600px] items-center justify-center gap-4 pb-5 px-4">
            <div className="flex items-center gap-4 text-amber-800">
              <CameraOff />
              <Paperclip />
            </div>
            <DropDownMemesSigularity onChange={e => setQuery(e.target.value)}/>
            <button disabled={isPending} className="p-2 bg-amber-800 hover:bg-amber-900 text-white rounded-lg flex items-center justify-center disabled:bg-amber-600 disabled:opacity-40">
              <SendHorizonal />
            </button>
          </form>
        ): (
        <form onSubmit={sendMessage} className="flex w-full md:max-w-[600px] items-center justify-center gap-4 pb-5 px-4">
          <div className="flex items-center gap-4 text-amber-800">
            <CameraOff />
            <Paperclip />
          </div>
           <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" className="flex flex-1 py-2 px-4 bg-transparent border border-amber-800 focus:border-amber-950 rounded-full" />
          <button disabled={isPending} className="p-2 bg-amber-800 hover:bg-amber-900 text-white rounded-lg flex items-center justify-center disabled:bg-amber-600 disabled:opacity-40">
            <SendHorizonal />
          </button>
        </form>
        )}
      </main>
    </section>
  );
}

"use client";
import { useState } from "react";
import { Message, MessageProps } from "./components/message";
import { SendHorizonal } from "lucide-react";
import {AudioButton} from "@/app/components/audio-button"
export default function Home() {
  const [messages, setMessages] = useState<MessageProps[]>([{content: "Olá tudo bem? Eu sou o Barista e sou seu Barman pessoal dessa noite alguma pergunta sobre nosso estabelecimento", audioId: "0b2b7c03-e196-41f1-9b98-c8847b9f2f0b", isFromYou: false}])
  
  
  async function sendMessage(){

  }

  return (
    <section className="w-full h-screen bg-teal-50 flex items-center justify-center">
      <main className="border border-black rounded-lg p-5 min-w-96 flex flex-col items-center">
        <div className="w-full flex flex-1 flex-col gap-1">
          {messages.map((item, index) => {
            return <Message content={item.content} key={item.audioId} audioId={item.audioId} isFromYou={item.isFromYou} />
          })}
        </div>

        <div className="flex w-full items-center justify-center gap-4 mt-5">
          <input type="text" className="flex flex-1 py-2 px-4 bg-transparent border rounded-full" />
          <button className="p-2 bg-slate-600 hover:bg-slate-800 text-white rounded-lg flex items-center justify-center">
            <SendHorizonal />
          </button>
        </div>
      </main>
    </section>
  );
}

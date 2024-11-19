import { ElevenLabsClient } from "elevenlabs";
import { createWriteStream, mkdirSync } from "fs";
import { v4 as UUID, v4 } from "uuid";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import path from "path";
import fs from "fs"



const ELEVENLABSKEY = process.env.NEXT_PUBLIC_ELEVEN_LABS_KEY
const supabase = createClient("https://rtohlrqipxvggrzokwxp.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0b2hscnFpcHh2Z2dyem9rd3hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NzI3NjAsImV4cCI6MjA0NzU0ODc2MH0.SW6ovr8G9BGOagUwUmHBuTsr53KEdcDg6Ou2E3GttW0")

export const createAudioFileFromText = async (text: string) => {
    try {
        const result = await axios.post("https://api.elevenlabs.io/v1/text-to-speech/CwhRBWXzGAHq8TQ4Fs17/stream", {
            text,
            model_id: "eleven_multilingual_v2"
        },
        {
            headers: {
                "xi-api-key": `${ELEVENLABSKEY!}`
            },
            responseType: "stream",
            transitional: {clarifyTimeoutError: true},
            httpAgent: new (require("http").Agent)({ keepAlive: true }),
            
        }
    )

    const filename = `${v4()}.mp3`

    const {error} = await supabase.storage.from("image_bucket").upload(
        filename,
        result.data,
        {
            cacheControl: "3600",
            contentType: "audio/mpeg",
            upsert: false,
            duplex: 'half'
        }
    )


    if (error) {
        throw new Error(`Erro ao enviar áudio para o Supabase: ${error.message}`);
    }

    console.log(`Áudio enviado para o Supabase como: ${filename}`);


    } catch (error) {
        throw error
    }
};


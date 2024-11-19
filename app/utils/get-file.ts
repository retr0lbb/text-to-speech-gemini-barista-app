import { v4 } from "uuid";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "./supabase-client"
import axios from "axios";



const ELEVENLABSKEY = process.env.NEXT_PUBLIC_ELEVEN_LABS_KEY

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

    const filename = `${v4()}`

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

    return filename 

    } catch (error) {
        throw error
    }
};



//my app route https://rtohlrqipxvggrzokwxp.supabase.co/storage/v1/object/public/image_bucket/5c1e087e-0ee5-4182-885d-d97344b64919.mp3
// other route https://rtohlrqipxvggrzokwxp.supabase.co/storage/v1/object/public/image_bucket/5c1e087e-0ee5-4182-885d-d97344b64919
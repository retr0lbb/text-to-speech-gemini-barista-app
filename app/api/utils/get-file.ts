import { ElevenLabsClient } from "elevenlabs";
import { createWriteStream, mkdirSync } from "fs";
import { v4 as UUID } from "uuid";
import axios from "axios";
import path from "path";



const ELEVENLABSKEY = process.env.NEXT_PUBLIC_ELEVEN_LABS_KEY




const audioDir = path.join(process.cwd(), 'public', 'audio');

mkdirSync(audioDir, { recursive: true });

export const createAudioFileFromText = async (text: string) => {
    try {
        const result = await axios.post("https://api.elevenlabs.io/v1/text-to-speech/CwhRBWXzGAHq8TQ4Fs17/stream", {
            text
        },
        {
            headers: {
                "xi-api-key": `${ELEVENLABSKEY!}`
            }
        }
    )

    console.log(result)

    } catch (error) {
        
    }
};


/**
 * const audio = await client.generate({
                voice: "Roger",
                model_id: "eleven_multilingual_v2",
                text,
            });
 */
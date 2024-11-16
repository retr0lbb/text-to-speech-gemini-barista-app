import { ElevenLabsClient } from "elevenlabs";
import { createWriteStream, mkdirSync } from "fs";
import { v4 as UUID } from "uuid";
import path from "path";
import { env } from "../utils/env";



const ELEVENLABSKEY = env.ELEVEN_LABS_KEY

const client = new ElevenLabsClient({
    apiKey: ELEVENLABSKEY,
});

const audioDir = path.join(process.cwd(), 'public', 'audio');

mkdirSync(audioDir, { recursive: true });

export const createAudioFileFromText = async (text: string): Promise<string> => {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const audio = await client.generate({
                voice: "Roger",
                model_id: "eleven_multilingual_v2",
                text,
            });

            const fileUUIDName = UUID()

            const filename = path.join(audioDir, `${fileUUIDName}.mp3`);
            const fileStream = createWriteStream(filename);

            audio.pipe(fileStream);

            fileStream.on("finish", () => resolve(fileUUIDName));
            fileStream.on("error", reject);
        } catch (error) {
            reject(error);
        }
    });
};

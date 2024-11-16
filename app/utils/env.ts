import { z } from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string().min(1),
    CHATBOT_KEY: z.string().min(1),
    ELEVEN_LABS_KEY: z.string().min(1),
    GOOGLE_API: z.string().min(1)
})

export const env = envSchema.parse(process.env)
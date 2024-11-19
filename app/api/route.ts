import { NextResponse } from "next/server";
import { createAudioFileFromText } from "@/app/api/utils/get-file";
import { z } from "zod";
import { prisma } from "./utils/prima-client";

const bodySchema = z.object({
    text: z.string(),
    prompt: z.string()
});

export async function POST(request: Request) {
    try {
        const jsonBody = await request.json();
        const { text, prompt } = bodySchema.parse(jsonBody);

        await createAudioFileFromText(text);

        // const result = await prisma.message.create({
        //     data: {
        //         messageAudioPath: audioName,
        //         messageContent: text,
        //         prompt: prompt,
                
        //     }
        // })
        // prisma.$disconnect()

        return NextResponse.json({
            message: "some message"
            // audioName, result
        });
    } catch (error) {
        return NextResponse.json(
            { status: 400, error } 
        );
    }
}

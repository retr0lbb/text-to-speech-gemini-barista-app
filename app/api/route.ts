import { NextResponse } from "next/server";
import { createAudioFileFromText } from "@/app/utils/get-file";
import { z } from "zod";

const bodySchema = z.object({
    text: z.string(),
});

export async function POST(request: Request) {
    try {
        const jsonBody = await request.json();
        const { text } = bodySchema.parse(jsonBody);

        const audioPath = await createAudioFileFromText(text);

        return NextResponse.json({
            audio_path: audioPath,
        });
    } catch (error) {
        return NextResponse.json(
            { status: 400 } 
        );
    }
}

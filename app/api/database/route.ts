import { NextResponse } from "next/server";
import {prisma} from "@/app/utils/prima-client"
import { z } from "zod";

const bodySchema = z.object({
    text: z.string(),
});

export async function POST(request: Request) {
    const jsonBody = await request.json();
    const { text } = bodySchema.parse(jsonBody);
    try {
        const messagesFound = await prisma.message.findMany({
            where: {
                prompt: text
            }
        })

        return NextResponse.json(messagesFound)
    } catch (error) {
        return NextResponse.json(
            { status: 400, error} 
        );
    }
}

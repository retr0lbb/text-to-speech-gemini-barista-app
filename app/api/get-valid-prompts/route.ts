import { NextResponse } from "next/server";
import {prisma} from "@/app/api/utils/prima-client"

export async function GET() {
    try {
        const messagePropts = await prisma.message.findMany({
            select: {
                prompt: true
            }
        })

        return NextResponse.json(messagePropts)
    } catch (error) {
        return NextResponse.json(
            { status: 400, error} 
        );
    }
}

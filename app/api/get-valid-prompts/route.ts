import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prima-client"

export async function GET() {
    try {
        const messagePropts = await prisma.message.findMany()
        const response = NextResponse.json(messagePropts)
        response.headers.set("Cache-Control", "no-store")
        return response
        
    } catch (error) {

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

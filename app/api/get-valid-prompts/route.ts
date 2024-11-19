import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prima-client"

export async function GET() {
    try {
        const messagePropts = await prisma.message.findMany()
        console.log("Fetched data: ", messagePropts);
        const response = NextResponse.json(messagePropts)
        response.headers.set("Cache-Control", "no-store")

        return response
    } catch (error) {

        return NextResponse.json(
            { status: 400, error} 
        );
    }
}

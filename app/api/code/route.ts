import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limits";



const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage: ChatCompletionRequestMessage = {
    role: 'system',
    content: "You are a code generator. You must answer only in markdown code snippest. Use code comments for explanation"
}
const openai = new OpenAIApi(configuration);

export async function POST(
    req: Request

) {
    try {
        const { userId } = auth();

        const body = await req.json();
        const { messages } = body;


        if (!userId) {
            return new NextResponse("Unauthroize", { status: 401 })
        }


        if (!configuration.apiKey) {

            return new NextResponse("openai API key is not configured", { status: 500 })
        }

        if (!messages) {
            return new NextResponse("Message is required", { status: 400 })
        }


        const freeTrail = await checkApiLimit();

        if (!freeTrail) {
            return new NextResponse("Free trial expired.", { status: 403 });
        }

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [instructionMessage, ...messages]
        })
        await increaseApiLimit();

        return NextResponse.json(response.data.choices[0].message)


    } catch (error) {
        console.log("CODE_ERROR", error);
        return new NextResponse("Internal error", { status: 400 })
    }
}
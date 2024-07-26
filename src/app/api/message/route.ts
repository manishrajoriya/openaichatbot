import { chatbotPrompt } from "@/app/helpers/constants/chatbot-prompt"
import { ChatGPTMessage, OpenAIStream, OpenAIStreamPayload } from "@/lib/poenai-stream"
import { MessageArraySchema } from "@/lib/validators/message"



export async function POST(req: Request){
    const {message} = await req.json()

    const parseMessages = MessageArraySchema.parse(message)

    const outBoundMessage: ChatGPTMessage[] = parseMessages.map((message)=>({
        role: message.isUserMessage ? 'user' : "system",
        content: message.text
    }))

    outBoundMessage.unshift({
        role: 'system',
        content: chatbotPrompt
    
    })

    const paylod: OpenAIStreamPayload = {
        model: 'gpt-3.5-turbo',
        messages: outBoundMessage,
        temprature: 0.4,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 150,
        stream: true,
        n: 1
    
    }

    const stream = await OpenAIStream(paylod)

    return new Response(stream)
    
}
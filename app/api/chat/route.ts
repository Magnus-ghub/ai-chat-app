import { NextRequest } from 'next/server'
import OpenAI from 'openai'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const { messages, systemPrompt } = await req.json()

  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'OPENAI_API_KEY not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const stream = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    stream: true,
    max_tokens: 1000,
    temperature: 0.7,
    messages: [
      {
        role: 'system',
        content: systemPrompt || 'You are a helpful AI assistant.',
      },
      ...messages,
    ],
  })

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || ''
        if (text) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`))
        }
      }
      controller.enqueue(encoder.encode('data: [DONE]\n\n'))
      controller.close()
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
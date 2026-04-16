// src/app/api/chat/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const apiKey = process.env.GROQ_API_KEY

    if (!apiKey) {
      console.error('GROQ_API_KEY is not set')
      return NextResponse.json({ error: 'API key tidak ditemukan' }, { status: 500 })
    }

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7
      })
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('Groq API error:', res.status, errText)
      return NextResponse.json({ error: `Groq error: ${res.status}` }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Chat route error:', error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}
import { useState, useEffect, useRef } from 'react'

export type Role = 'user' | 'assistant'

export interface Message {
  id: string
  role: Role
  content: string
  timestamp: string
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === 'undefined') return []
    try {
      const saved = localStorage.getItem('chat-messages')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })
  const [streaming, setStreaming] = useState('')
  const [loading, setLoading] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  

  useEffect(() => {
    localStorage.setItem('chat-messages', JSON.stringify(messages))
  }, [messages])

  const send = async (input: string, systemPrompt?: string, model = 'gpt-4o-mini') => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    }

    setMessages(prev => [...prev, userMsg])
    setLoading(true)
    setStreaming('')

    abortRef.current = new AbortController()

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortRef.current.signal,
        body: JSON.stringify({
          messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })),
          systemPrompt: systemPrompt || undefined,
          model,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error)
      }

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const lines = decoder.decode(value).split('\n')
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6)
          if (data === '[DONE]') continue
          try {
            accumulated += JSON.parse(data).text
            setStreaming(accumulated)
          } catch {}
        }
      }

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: accumulated,
        timestamp: new Date().toISOString(),
      }])
      setStreaming('')
    } catch (err: unknown) {
      if ((err as Error).name === 'AbortError') {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'assistant',
          content: streaming || '_(stopped)_',
          timestamp: new Date().toISOString(),
        }])
      } else {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'assistant',
          content: `⚠️ ${err instanceof Error ? err.message : 'Something went wrong'}`,
          timestamp: new Date().toISOString(),
        }])
      }
      setStreaming('')
    } finally {
      setLoading(false)
      abortRef.current = null
    }
  }

  const stop = () => {
    abortRef.current?.abort()
  }

  const clear = () => {
    setMessages([])
    setStreaming('')
    localStorage.removeItem('chat-messages')
  }

  return { messages, streaming, loading, send, stop, clear }
}
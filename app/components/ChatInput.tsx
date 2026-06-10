'use client'

import { useState, useRef } from 'react'
import { i18n, Lang } from '../lib/i18n'

interface Props {
  lang: Lang
  loading: boolean
  onSend: (text: string) => void
  initialValue?: string
}

export default function ChatInput({ lang, loading, onSend, initialValue = '' }: Props) {
  const [input, setInput] = useState(initialValue)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const t = i18n[lang]

  const adjustHeight = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 140) + 'px'
  }

  const send = () => {
    const text = input.trim()
    if (!text || loading) return
    onSend(text)
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <footer style={{
      padding: '12px 16px',
      borderTop: '1px solid var(--border)',
      background: 'var(--surface)',
      flexShrink: 0,
    }}>
      <div style={{
        display: 'flex', alignItems: 'flex-end', gap: 10,
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        borderRadius: 16, padding: '8px 8px 8px 14px',
      }}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={e => { setInput(e.target.value); adjustHeight() }}
          onKeyDown={onKeyDown}
          placeholder={t.placeholder}
          rows={1}
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--text-primary)', fontSize: 14, lineHeight: 1.6,
            resize: 'none', fontFamily: 'inherit', minHeight: 24, maxHeight: 140, padding: 0,
          }}
        />
        <button onClick={send} disabled={!input.trim() || loading} style={{
          width: 36, height: 36, borderRadius: 10, border: 'none', cursor: 'pointer',
          background: !input.trim() || loading ? 'var(--border)' : 'var(--accent)',
          color: '#fff', fontSize: 18,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>↑</button>
      </div>
      <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>
        {lang === 'en' ? 'Enter to send · Shift+Enter for new line' : 'Enter 전송 · Shift+Enter 줄바꿈'}
      </p>
    </footer>
  )
}
'use client'

import { useState, useRef, useEffect } from 'react'
import { i18n, Lang } from '../lib/i18n'

export type Model = 'gpt-4o-mini' | 'gpt-4o' | 'gpt-3.5-turbo'

interface Props {
  lang: Lang
  loading: boolean
  onSend: (text: string, model: Model) => void
  onStop: () => void
  initialValue?: string
}

export default function ChatInput({ lang, loading, onSend, onStop, initialValue = '' }: Props) {
  const [input, setInput] = useState(initialValue)
  const [model, setModel] = useState<Model>('gpt-4o-mini')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const t = i18n[lang]

  useEffect(() => {
    if (initialValue) setInput(initialValue)
  }, [initialValue])

  const adjustHeight = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 140) + 'px'
  }

  const send = () => {
    const text = input.trim()
    if (!text || loading) return
    onSend(text, model)
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const charCount = input.length
  const tokenEstimate = Math.ceil(charCount / 4)

  return (
    <footer style={{
      padding: '12px 16px',
      borderTop: '1px solid var(--border)',
      background: 'var(--surface)',
      flexShrink: 0,
    }}>
      {/* Model selector */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
        {(['gpt-4o-mini', 'gpt-4o', 'gpt-3.5-turbo'] as Model[]).map(m => (
          <button key={m} onClick={() => setModel(m)} style={{
            padding: '4px 10px', fontSize: 11, borderRadius: 6, cursor: 'pointer',
            background: model === m ? 'var(--accent-soft)' : 'transparent',
            border: `1px solid ${model === m ? 'var(--accent-border)' : 'var(--border)'}`,
            color: model === m ? 'var(--accent)' : 'var(--text-muted)',
            fontWeight: model === m ? 600 : 400,
          }}>{m}</button>
        ))}
      </div>

      {/* Input area */}
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

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          {charCount > 0 && (
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              ~{tokenEstimate}t
            </span>
          )}

          {loading ? (
            <button onClick={onStop} style={{
              width: 36, height: 36, borderRadius: 10, border: 'none', cursor: 'pointer',
              background: '#ef4444',
              color: '#fff', fontSize: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>■</button>
          ) : (
            <button onClick={send} disabled={!input.trim()} style={{
              width: 36, height: 36, borderRadius: 10, border: 'none', cursor: 'pointer',
              background: !input.trim() ? 'var(--border)' : 'var(--accent)',
              color: '#fff', fontSize: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>↑</button>
          )}
        </div>
      </div>

      <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>
        {lang === 'en' ? 'Enter to send · Shift+Enter for new line' : 'Enter 전송 · Shift+Enter 줄바꿈'}
      </p>
    </footer>
  )
}
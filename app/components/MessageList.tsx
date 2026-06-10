'use client'

import { useEffect, useRef } from 'react'
import { Message } from '../hooks/useChat'
import { i18n, Lang } from '../lib/i18n'
import MessageBubble from './MessageBubble'

interface Props {
  messages: Message[]
  streaming: string
  loading: boolean
  lang: Lang
  onHintClick: (hint: string) => void
}

export default function MessageList({ messages, streaming, loading, lang, onHintClick }: Props) {
  const t = i18n[lang]
  const bottomRef = useRef<HTMLDivElement>(null)
  const isEmpty = messages.length === 0 && !streaming

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streaming])

  return (
    <main style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {isEmpty ? (
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '40px 20px',
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: 20, marginBottom: 20,
            background: 'linear-gradient(135deg, #7c6aff, #a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
          }}>✦</div>
          <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{t.welcome}</div>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>{t.welcomeSub}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {t.hints.map(h => (
              <button key={h} onClick={() => onHintClick(h)} style={{
                padding: '7px 14px', fontSize: 13, borderRadius: 20, cursor: 'pointer',
                background: 'var(--surface)', border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
              }}>{h}</button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {messages.map(msg => (
            <MessageBubble key={msg.id} msg={msg} lang={lang} />
          ))}

          {streaming && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'linear-gradient(135deg, #7c6aff, #a855f7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 600, color: '#fff', flexShrink: 0,
              }}>AI</div>
              <div style={{
                background: 'var(--surface-2)',
                color: 'var(--text-primary)',
                padding: '10px 14px',
                borderRadius: '18px 18px 18px 4px',
                border: '1px solid var(--border)',
                fontSize: 14, lineHeight: 1.65,
                whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                maxWidth: '75vw',
              }}>
                {streaming}
                <span style={{
                  display: 'inline-block', width: 2, height: 14, marginLeft: 2,
                  background: 'var(--accent)', borderRadius: 1, verticalAlign: 'text-bottom',
                  animation: 'blink 0.8s ease-in-out infinite',
                }} />
              </div>
            </div>
          )}

          {loading && !streaming && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 36 }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t.thinking}</span>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: 4, height: 4, borderRadius: '50%', display: 'inline-block',
                  background: 'var(--text-muted)',
                  animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          )}
        </>
      )}
      <div ref={bottomRef} />
    </main>
  )
}
'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Message } from '../hooks/useChat'
import { i18n, Lang } from '../lib/i18n'

interface Props {
  msg: Message
  lang: Lang
}

export default function MessageBubble({ msg, lang }: Props) {
  const [copied, setCopied] = useState(false)
  const t = i18n[lang]
  const isUser = msg.role === 'user'

  const copy = () => {
    navigator.clipboard.writeText(msg.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: isUser ? 'flex-end' : 'flex-start',
      gap: 4,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 8,
        flexDirection: isUser ? 'row-reverse' : 'row',
      }}>
        {!isUser && (
          <div style={{
            width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #7c6aff, #a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 600, color: '#fff',
          }}>AI</div>
        )}
        <div style={{
          background: isUser ? 'var(--accent)' : 'var(--surface-2)',
          color: 'var(--text-primary)',
          padding: '10px 14px',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          border: isUser ? 'none' : '1px solid var(--border)',
          fontSize: 14,
          lineHeight: 1.65,
          wordBreak: 'break-word',
          maxWidth: '75vw',
        }}>
          {isUser ? (
            <span style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</span>
          ) : (
            <ReactMarkdown components={{
              p: ({ children }) => <p style={{ margin: '0 0 8px' }}>{children}</p>,
              ul: ({ children }) => <ul style={{ paddingLeft: 20, margin: '0 0 8px' }}>{children}</ul>,
              ol: ({ children }) => <ol style={{ paddingLeft: 20, margin: '0 0 8px' }}>{children}</ol>,
              li: ({ children }) => <li style={{ marginBottom: 4 }}>{children}</li>,
              strong: ({ children }) => <strong style={{ fontWeight: 600 }}>{children}</strong>,
              code: ({ children, className }) => {
                const isBlock = !!className
                return isBlock ? (
                  <pre style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    padding: '10px 12px',
                    overflowX: 'auto',
                    margin: '8px 0',
                    fontSize: 13,
                  }}>
                    <code style={{ fontFamily: 'monospace' }}>{children}</code>
                  </pre>
                ) : (
                  <code style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 4,
                    padding: '1px 6px',
                    fontSize: 13,
                    fontFamily: 'monospace',
                  }}>{children}</code>
                )
              },
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
                  {children}
                </a>
              ),
              blockquote: ({ children }) => (
                <blockquote style={{
                  borderLeft: '3px solid var(--accent)',
                  paddingLeft: 12,
                  margin: '8px 0',
                  color: 'var(--text-secondary)',
                }}>{children}</blockquote>
              ),
            }}>
              {msg.content}
            </ReactMarkdown>
          )}
        </div>
      </div>

      <div style={{
        display: 'flex', gap: 8, alignItems: 'center',
        paddingLeft: isUser ? 0 : 36,
        flexDirection: isUser ? 'row-reverse' : 'row',
      }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        <button onClick={copy} style={{
          fontSize: 11, background: 'none', border: 'none', cursor: 'pointer',
          color: copied ? 'var(--accent)' : 'var(--text-muted)',
        }}>
          {copied ? t.copied : t.copy}
        </button>
      </div>
    </div>
  )
}
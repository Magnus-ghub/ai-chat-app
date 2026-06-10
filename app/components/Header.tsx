'use client'

import { i18n, Lang } from '../lib/i18n'

interface Props {
  lang: Lang
  theme: 'dark' | 'light'
  showSystem: boolean
  hasMessages: boolean
  onLangChange: (lang: Lang) => void
  onThemeToggle: () => void
  onSystemToggle: () => void
  onClear: () => void
}

export default function Header({
  lang, theme, showSystem, hasMessages,
  onLangChange, onThemeToggle, onSystemToggle, onClear,
}: Props) {
  const t = i18n[lang]

  const btn = (onClick: () => void, active: boolean, children: React.ReactNode) => (
    <button onClick={onClick} style={{
      padding: '5px 10px', fontSize: 12, borderRadius: 8, cursor: 'pointer',
      background: active ? 'var(--accent-soft)' : 'transparent',
      border: `1px solid ${active ? 'var(--accent-border)' : 'var(--border)'}`,
      color: active ? 'var(--accent)' : 'var(--text-secondary)',
    }}>{children}</button>
  )

  return (
    <header style={{
      padding: '10px 16px',
      borderBottom: '1px solid var(--border)',
      background: 'var(--surface)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: 'linear-gradient(135deg, #7c6aff, #a855f7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 700, color: '#fff',
        }}>AI</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>{t.title}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.subtitle}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {btn(onSystemToggle, showSystem, `⚙ ${t.system}`)}

        {hasMessages && btn(onClear, false, t.clear)}

        <button onClick={onThemeToggle} style={{
          padding: '5px 10px', fontSize: 14, borderRadius: 8, cursor: 'pointer',
          background: 'transparent', border: '1px solid var(--border)',
          color: 'var(--text-secondary)',
        }}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
          {(['en', 'ko'] as Lang[]).map(l => (
            <button key={l} onClick={() => onLangChange(l)} style={{
              padding: '5px 10px', fontSize: 12, border: 'none', cursor: 'pointer',
              background: lang === l ? 'var(--accent)' : 'transparent',
              color: lang === l ? '#fff' : 'var(--text-secondary)',
              fontWeight: lang === l ? 600 : 400,
            }}>{l.toUpperCase()}</button>
          ))}
        </div>
      </div>
    </header>
  )
}
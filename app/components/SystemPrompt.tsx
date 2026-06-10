'use client'

import { i18n, Lang } from '../lib/i18n'

interface Props {
  lang: Lang
  value: string
  onChange: (value: string) => void
}

export default function SystemPrompt({ lang, value, onChange }: Props) {
  const t = i18n[lang]

  return (
    <div style={{
      padding: '10px 16px',
      borderBottom: '1px solid var(--border)',
      background: 'var(--surface)',
      flexShrink: 0,
    }}>
      <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
        {t.systemLabel}
      </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={t.systemPlaceholder}
        rows={2}
        style={{
          width: '100%',
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          color: 'var(--text-primary)',
          fontSize: 13,
          padding: '8px 10px',
          resize: 'none',
          outline: 'none',
          fontFamily: 'inherit',
          lineHeight: 1.5,
        }}
      />
    </div>
  )
}
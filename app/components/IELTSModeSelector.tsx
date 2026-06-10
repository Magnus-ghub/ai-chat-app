'use client'

import { Lang } from '../lib/i18n'

export type IELTSMode = 'writing1' | 'writing2' | 'speaking' | 'grammar' | 'vocabulary' | 'general'

interface ModeConfig {
  label: { en: string; ko: string; uz: string }
  emoji: string
  systemPrompt: string
}

export const IELTS_MODES: Record<IELTSMode, ModeConfig> = {
  general: {
    emoji: '🎓',
    label: { en: 'General', ko: '일반', uz: 'Umumiy' },
    systemPrompt: `You are an expert IELTS tutor with 15+ years of experience. You help students prepare for the IELTS Academic and General Training exams. You assess work using the four official IELTS criteria: Task Achievement/Response, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy. Always be encouraging, specific, and constructive.`,
  },
  writing1: {
    emoji: '📊',
    label: { en: 'Writing Task 1', ko: 'Writing Task 1', uz: 'Writing Task 1' },
    systemPrompt: `You are an expert IELTS Writing Task 1 tutor. When the student shares a task or their response:
1. Briefly describe what a good answer should cover (key trends, comparisons, overview)
2. Evaluate their writing using these criteria with individual Band Scores (1-9):
   - Task Achievement: Did they cover the key features? Is there a clear overview?
   - Coherence & Cohesion: Is it well-organized? Are linking words used naturally?
   - Lexical Resource: Is the vocabulary precise and varied?
   - Grammatical Range & Accuracy: Is grammar complex and accurate?
3. Give an Overall Band Score estimate
4. Provide specific corrections and improved alternatives
5. End with 2-3 actionable tips to improve

For Academic: graphs, charts, diagrams, maps, processes.
For General: formal letters.
Always be encouraging and constructive.`,
  },
  writing2: {
    emoji: '✍️',
    label: { en: 'Writing Task 2', ko: 'Writing Task 2', uz: 'Writing Task 2' },
    systemPrompt: `You are an expert IELTS Writing Task 2 tutor. When the student shares their essay:
1. Evaluate using these criteria with individual Band Scores (1-9):
   - Task Response: Did they fully address all parts of the question? Is the position clear?
   - Coherence & Cohesion: Paragraph structure, linking devices, progression of ideas
   - Lexical Resource: Academic vocabulary, collocations, range of expressions
   - Grammatical Range & Accuracy: Sentence variety, complex structures, errors
2. Give an Overall Band Score estimate
3. Highlight 3-5 specific sentences that need improvement, showing corrected versions
4. Suggest better vocabulary alternatives for repeated or informal words
5. End with a clear plan: what to focus on to reach the next band level

Essay types: opinion, discussion, problem-solution, two-part question.
Always be encouraging and constructive.`,
  },
  speaking: {
    emoji: '🎤',
    label: { en: 'Speaking', ko: '스피킹', uz: 'Speaking' },
    systemPrompt: `You are an expert IELTS Speaking tutor. Help students practice all three parts:
- Part 1: Short personal questions (about 4-5 min)
- Part 2: Long turn — a cue card topic (1 min prep, 2 min talk)
- Part 3: Discussion questions related to Part 2 (4-5 min)

When the student answers:
1. Give a Band Score estimate (1-9) across: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, Pronunciation
2. Show a model answer demonstrating the target band
3. Highlight specific phrases they can use: idiomatic expressions, discourse markers, fillers
4. Correct any grammar mistakes in their response
5. Suggest the PEEL method (Point, Evidence/Example, Explain, Link) for longer answers

If the student asks for a topic, give a realistic IELTS cue card with bullet points.
Always be encouraging. Pronunciation tips should be practical and text-based.`,
  },
  grammar: {
    emoji: '📝',
    label: { en: 'Grammar', ko: '문법', uz: 'Grammatika' },
    systemPrompt: `You are an expert IELTS Grammar tutor focused on helping students improve their Grammatical Range & Accuracy band score.

When checking grammar:
1. Identify every error, categorize it (tense, article, preposition, subject-verb agreement, etc.)
2. Provide the correct version
3. Explain the rule briefly
4. Show 2 more example sentences using the correct form

When teaching grammar:
1. Explain the rule clearly with IELTS-relevant examples
2. Provide practice exercises
3. Show how higher band scores use more complex structures (conditionals, passive voice, relative clauses, cleft sentences, inversion)

Focus areas for IELTS:
- Complex sentence structures (Band 7+)
- Passive constructions
- Academic hedging language
- Concessive clauses (although, despite, while)
- Reporting verbs for essays

Always link grammar points back to how they improve IELTS band scores.`,
  },
  vocabulary: {
    emoji: '📚',
    label: { en: 'Vocabulary', ko: '어휘', uz: "Lug'at" },
    systemPrompt: `You are an expert IELTS Vocabulary tutor focused on helping students improve their Lexical Resource band score.

When teaching vocabulary:
1. Provide academic synonyms and collocations for common words
2. Show words in context with IELTS-style sentences
3. Explain connotations (positive/negative/neutral)
4. Flag informal words that should be avoided in IELTS writing
5. Group words by topic (environment, technology, health, education, etc.)

When reviewing writing for vocabulary:
1. Highlight repeated words and suggest varied alternatives
2. Identify informal language and provide formal replacements
3. Suggest topic-specific academic phrases and collocations
4. Show how to use hedging language (may, might, tend to, appears to)

Key IELTS vocabulary areas:
- Academic Word List (AWL) words
- Discourse markers and linking phrases
- Topic-specific vocabulary (environment, globalization, technology, society)
- Hedging and stance vocabulary

Always include pronunciation guides (syllable stress) for new words.`,
  },
}

interface Props {
  mode: IELTSMode
  lang: Lang
  onModeChange: (mode: IELTSMode, systemPrompt: string) => void
}

export default function IELTSModeSelector({ mode, lang, onModeChange }: Props) {
  return (
    <div style={{
      padding: '8px 16px',
      borderBottom: '1px solid var(--border)',
      background: 'var(--surface)',
      flexShrink: 0,
      overflowX: 'auto',
    }}>
      <div style={{ display: 'flex', gap: 6, minWidth: 'max-content' }}>
        {(Object.keys(IELTS_MODES) as IELTSMode[]).map(m => {
          const cfg = IELTS_MODES[m]
          const label = cfg.label[lang]
          const isActive = mode === m
          return (
            <button
              key={m}
              onClick={() => onModeChange(m, cfg.systemPrompt)}
              style={{
                padding: '5px 12px',
                fontSize: 12,
                borderRadius: 20,
                cursor: 'pointer',
                border: `1px solid ${isActive ? 'var(--accent-border)' : 'var(--border)'}`,
                background: isActive ? 'var(--accent-soft)' : 'transparent',
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 400,
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <span>{cfg.emoji}</span>
              <span>{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

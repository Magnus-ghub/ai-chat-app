export type Lang = 'en' | 'ko'

export const i18n = {
  en: {
    title: 'AI Assistant',
    subtitle: 'Powered by GPT-4o mini',
    placeholder: 'Ask me anything...',
    clear: 'Clear',
    thinking: 'Thinking...',
    systemLabel: 'System prompt',
    systemPlaceholder: 'Customize AI behavior (optional)',
    welcome: 'Hello! How can I help you?',
    welcomeSub: "Ask me anything — I'm ready to assist.",
    copy: 'Copy',
    copied: 'Copied!',
    system: 'System',
    hints: [
      'Explain quantum computing',
      'Write a short poem',
      'Debug my code',
      'Translate to Korean',
    ],
  },
  ko: {
    title: 'AI 어시스턴트',
    subtitle: 'GPT-4o mini 기반',
    placeholder: '무엇이든 물어보세요...',
    clear: '초기화',
    thinking: '생각 중...',
    systemLabel: '시스템 프롬프트',
    systemPlaceholder: 'AI 동작 방식 설정 (선택사항)',
    welcome: '안녕하세요! 무엇을 도와드릴까요?',
    welcomeSub: '무엇이든 물어보세요.',
    copy: '복사',
    copied: '복사됨!',
    system: '설정',
    hints: [
      '양자 컴퓨팅 설명해줘',
      '짧은 시 써줘',
      '코드 도와줘',
      '영어로 번역해줘',
    ],
  },
}
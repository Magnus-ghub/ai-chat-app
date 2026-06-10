# IELTS Tutor — AI 기반 IELTS 준비 플랫폼

> **라이브 데모:** [https://ai.cuben.info](https://ai.cuben.info)

인공지능을 활용한 IELTS 시험 준비 웹 애플리케이션입니다. Writing, Speaking, Grammar, Vocabulary 영역에서 실시간 전문가 수준의 피드백과 밴드 점수(1–9)를 제공합니다.

---

## 프로젝트 개요

이 프로젝트는 IELTS 수험생들이 AI 튜터와 1:1로 연습할 수 있는 대화형 학습 플랫폼입니다. OpenAI GPT 모델을 활용하여 각 영역별 전문 튜터 역할을 수행하며, 실제 IELTS 채점 기준(Task Achievement, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy)에 따라 평가합니다.

---

## 주요 기능 및 AI 구현

### 1. 6가지 전문 학습 모드

각 모드는 고유한 시스템 프롬프트로 구동되어 해당 영역 전문가처럼 동작합니다:

| 모드 | 설명 | AI 역할 |
|------|------|---------|
| 🎓 일반 (General) | 전반적인 IELTS 질문 및 전략 | 종합 IELTS 전문 튜터 |
| 📊 Writing Task 1 | 그래프·도표·다이어그램 분석 | Task 1 채점 전문가 |
| ✍️ Writing Task 2 | 에세이 작성 및 첨삭 | 4개 기준별 Band Score 제공 |
| 🎤 Speaking | Part 1/2/3 말하기 연습 | 모범 답안 + 표현 코칭 |
| 📝 Grammar | 문법 오류 탐지 및 교정 | 오류 범주화 + 규칙 설명 |
| 📚 Vocabulary | 학문적 어휘 및 콜로케이션 | Academic Word List 기반 |

### 2. AI 응답 방식 (Writing Task 2 예시)

학생이 에세이를 제출하면 AI는 다음을 제공합니다:

```
[Task Response]        Band: 6.5
[Coherence & Cohesion] Band: 7.0
[Lexical Resource]     Band: 6.0
[Grammatical Range]    Band: 6.5
─────────────────────────────────
Overall Band Score:    6.5

✗ "Also, there are many problems."
✓ "Furthermore, a multitude of challenges have emerged."

Tips to reach Band 7:
1. Develop each body paragraph with a clear topic sentence
2. Replace general vocabulary with academic alternatives
3. Vary sentence structure using complex clauses
```

### 3. 실시간 스트리밍

OpenAI Streaming API를 활용하여 AI 응답이 문장 단위로 즉시 표시됩니다. Edge Runtime에서 실행되어 응답 지연(latency)을 최소화합니다.

### 4. 다국어 지원

| 언어 | 코드 | 대상 |
|------|------|------|
| 우즈베크어 | `uz` | 기본 사용자 |
| 영어 | `en` | 국제 사용자 |
| 한국어 | `ko` | 한국어 사용자 |

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| Frontend | Next.js 16, React 19, TypeScript |
| Backend | Next.js API Routes (Edge Runtime) |
| AI | OpenAI API (GPT-4o, GPT-4o mini) |
| 렌더링 | `react-markdown` (Markdown 지원) |
| 데이터 저장 | `localStorage` (채팅 기록 유지) |
| 배포 | Vercel (Edge Network) |

---

## 시스템 아키텍처

```
사용자 입력
    │
    ▼
ChatInput (클라이언트)
    │  텍스트 + 선택된 모드의 시스템 프롬프트
    ▼
/api/chat (Edge Runtime)
    │  OpenAI Streaming API 호출
    ▼
Server-Sent Events (SSE) 스트림
    │  청크 단위 전송
    ▼
MessageList (실시간 렌더링)
    │
    ▼
localStorage (자동 저장)
```

---

## 프로젝트 구조

```
ai-chat-app/
├── app/
│   ├── api/chat/route.ts          # OpenAI 스트리밍 엔드포인트
│   ├── components/
│   │   ├── IELTSModeSelector.tsx  # 6가지 모드 + 시스템 프롬프트 관리
│   │   ├── MessageList.tsx        # 메시지 목록 및 스크롤 제어
│   │   ├── MessageBubble.tsx      # 개별 메시지 (Markdown 렌더링)
│   │   ├── ChatInput.tsx          # 입력창 및 모델 선택
│   │   ├── SystemPrompt.tsx       # 시스템 프롬프트 편집 패널
│   │   └── Header.tsx             # 헤더 (테마, 언어, 내보내기)
│   ├── hooks/useChat.ts           # 채팅 상태 관리 + localStorage
│   ├── lib/i18n.ts                # 다국어 텍스트 (UZ/EN/KO)
│   └── page.tsx                   # 메인 페이지
└── .env.local                     # API 키 (비공개)
```

---

## 로컬 실행 방법

### 요구사항
- Node.js 18 이상
- OpenAI API 키

### 설치

```bash
# 저장소 복제
git clone <repo-url>
cd ai-chat-app

# 의존성 설치
npm install

# 환경 변수 설정
echo "OPENAI_API_KEY=sk-..." > .env.local

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:3000` 을 열어주세요.

### 빌드

```bash
npm run build
npm start
```

---

## 환경 변수

| 변수명 | 설명 | 필수 |
|--------|------|------|
| `OPENAI_API_KEY` | OpenAI API 인증 키 | ✅ |

---

## 사용 가능한 모델

| 모델 | 속도 | 품질 | 추천 용도 |
|------|------|------|-----------|
| `gpt-4o-mini` | ⚡ 빠름 | 좋음 | 일반 연습 |
| `gpt-4o` | 🔥 보통 | 최고 | 에세이 첨삭 |
| `gpt-3.5-turbo` | ✅ 빠름 | 보통 | 빠른 질문 |

---

## 라이브 데모

**[https://ai.cuben.info](https://ai.cuben.info)**

1. 상단에서 학습 모드 선택 (예: ✍️ Writing Task 2)
2. 에세이 또는 질문 입력
3. AI로부터 Band Score와 상세 피드백 수신

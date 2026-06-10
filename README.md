# AI Chat App

A personal AI assistant built with Next.js 14 and Groq API.

## Features

- Real-time streaming responses
- Multiple AI models (LLaMA, Mixtral)
- Markdown rendering with code highlighting
- Dark / Light mode
- English / Korean language support
- Custom system prompt
- Chat export (TXT, JSON)
- Auto-scroll toggle
- Chat history (localStorage)
- Stop generation anytime

## Tech Stack

- **Frontend:** Next.js 14, React, TypeScript
- **Backend:** Next.js API Routes (Edge Runtime)
- **AI:** Groq API (llama-3.1-8b-instant, llama-3.3-70b-versatile, mixtral-8x7b-32768)

## Setup

### 1. Install dependencies
\```bash
npm install
\```

### 2. Configure API key
\```bash
echo "GROQ_API_KEY=your-key-here" > .env.local
\```

### 3. Run development server
\```bash
npm run dev
\```

### 4. Build for production
\```bash
npm run build
npm start
\```

## Available Models

| Model | Speed | Quality |
|-------|-------|---------|
| llama-3.1-8b-instant | ⚡ Fastest | Good |
| llama-3.3-70b-versatile | 🔥 Fast | Best |
| mixtral-8x7b-32768 | ✅ Fast | Great |
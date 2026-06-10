"use client";

import { useState, useEffect } from "react";
import { Lang } from "./lib/i18n";
import { useChat } from "./hooks/useChat";
import Header from "./components/Header";
import SystemPrompt from "./components/SystemPrompt";
import IELTSModeSelector, { IELTSMode, IELTS_MODES } from "./components/IELTSModeSelector";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";

export default function ChatPage() {
  const [lang, setLang] = useState<Lang>("uz");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showSystem, setShowSystem] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState(IELTS_MODES.general.systemPrompt);
  const [mode, setMode] = useState<IELTSMode>("general");
  const [hintValue, setHintValue] = useState("");

  const { messages, streaming, loading, send, stop, clear } = useChat();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleModeChange = (newMode: IELTSMode, prompt: string) => {
    setMode(newMode);
    setSystemPrompt(prompt);
  };

  const handleSend = (text: string, model: string) => {
    setHintValue("");
    send(text, systemPrompt, model);
  };

  return (
    <div
      style={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        maxWidth: 760,
        margin: "0 auto",
      }}
    >
      <Header
        lang={lang}
        theme={theme}
        showSystem={showSystem}
        hasMessages={messages.length > 0}
        messages={messages}
        onLangChange={setLang}
        onThemeToggle={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        onSystemToggle={() => setShowSystem((p) => !p)}
        onClear={clear}
      />

      <IELTSModeSelector mode={mode} lang={lang} onModeChange={handleModeChange} />

      {showSystem && (
        <SystemPrompt
          lang={lang}
          value={systemPrompt}
          onChange={setSystemPrompt}
        />
      )}

      <MessageList
        messages={messages}
        streaming={streaming}
        loading={loading}
        lang={lang}
        onHintClick={setHintValue}
      />

      <ChatInput
        lang={lang}
        loading={loading}
        onSend={handleSend}
        onStop={stop}
        initialValue={hintValue}
      />

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-4px)} }
        button { transition: opacity 0.15s; }
        button:hover:not(:disabled) { opacity: 0.8; }
      `}</style>
    </div>
  );
}

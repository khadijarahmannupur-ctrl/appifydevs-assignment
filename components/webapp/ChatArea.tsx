"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@/hooks/useChat";
import { useAutoResizeTextarea } from "@/hooks/useAutoResizeTextarea";
import { MessageItem } from "./MessageItem";
import { ModelSelector } from "./ModelSelector";
import { PromptLibraryModal } from "./PromptLibraryModal";
import { PromptTemplate } from "@/types";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { SampleDataBadge } from "@/components/common/SampleDataBadge";
import {
  Send,
  Square,
  Sparkles,
  Mic,
  MicOff,
  Menu,
  BookOpen,
  Zap,
  Clock,
  RotateCcw,
  Command,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatAreaProps {
  chat: ReturnType<typeof useChat>;
  onOpenMobileSidebar: () => void;
  onOpenCommandPalette: () => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  chat,
  onOpenMobileSidebar,
  onOpenCommandPalette,
}) => {
  const {
    activeConversation,
    currentModel,
    activeModelId,
    setActiveModelId,
    sendMessage,
    stopStreaming,
    isStreaming,
    streamingTelemetry,
    screenReaderAnnouncement,
    rateMessage,
  } = chat;

  const [inputPrompt, setInputPrompt] = useState("");
  const [isPromptLibraryOpen, setIsPromptLibraryOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useAutoResizeTextarea(textareaRef, inputPrompt, 48, 180);

  // Auto-scroll to bottom when new messages arrive or stream updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation.messages, isStreaming]);

  const handleSend = () => {
    if (!inputPrompt.trim() || isStreaming) return;
    sendMessage(inputPrompt);
    setInputPrompt("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "48px";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    // "/" quick shortcut for templates
    if (e.key === "/" && inputPrompt.trim() === "") {
      e.preventDefault();
      setIsPromptLibraryOpen(true);
    }
  };

  const handleSelectTemplate = (template: PromptTemplate) => {
    setInputPrompt(template.prompt);
    if (template.modelSuggestion) {
      setActiveModelId(template.modelSuggestion);
    }
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  const toggleVoiceRecording = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      // Simulated voice recognition transcription after 2 seconds
      setTimeout(() => {
        setInputPrompt((prev) =>
          prev
            ? `${prev} Please explain the benefits of multi-model AI routing in Chrome side panels.`
            : "Please explain the benefits of multi-model AI routing in Chrome side panels."
        );
        setIsRecording(false);
      }, 2200);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50/50 dark:bg-[#0B0F19]">
      {/* Accessible Live Region for Screen Readers (Announces only upon stream completion) */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id="accessible-ai-announcer"
      >
        {screenReaderAnnouncement}
      </div>

      {/* Chat Header Bar */}
      <header className="h-16 shrink-0 px-4 sm:px-6 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-3 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            aria-label="Open sidebar menu"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Model Switcher Dropdown */}
          <ModelSelector
            selectedModelId={activeModelId}
            onSelectModel={setActiveModelId}
          />
        </div>

        {/* Header Right Tools */}
        <div className="flex items-center gap-2">
          {/* Prompt Templates Button */}
          <button
            type="button"
            onClick={() => setIsPromptLibraryOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition cursor-pointer select-none"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Templates</span>
            <kbd className="px-1 py-0.2 rounded bg-indigo-100 dark:bg-indigo-900 font-mono text-[10px] ml-0.5">
              /
            </kbd>
          </button>

          {/* Command Palette Trigger Button */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
            title="Open Command Palette (Cmd+K)"
          >
            <Command className="w-3.5 h-3.5" />
            <kbd className="font-mono text-[10px]">⌘K</kbd>
          </button>

          {/* Theme Switcher */}
          <ThemeToggle size="sm" />
        </div>
      </header>

      {/* Messages Scroll Area */}
      <main
        id="main-content"
        className="flex-1 overflow-y-auto px-3 sm:px-6 py-6 space-y-4 max-w-4xl w-full mx-auto"
      >
        {activeConversation.messages.map((msg) => (
          <MessageItem
            key={msg.id}
            message={msg}
            onRate={(rating) => rateMessage(msg.id, rating)}
          />
        ))}

        <div ref={messagesEndRef} className="h-4" />
      </main>

      {/* Bottom Prompt Input Dock */}
      <footer className="shrink-0 p-3 sm:p-6 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto w-full">
          {/* Telemetry during streaming */}
          {isStreaming && (
            <div className="mb-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-2 animate-in fade-in">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 font-mono text-indigo-500">
                  <Zap className="w-3.5 h-3.5 animate-pulse" />
                  {streamingTelemetry.speed || currentModel.tokensPerSec} tokens/s
                </span>
                <span className="flex items-center gap-1 font-mono text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  ~{streamingTelemetry.latencyMs || currentModel.latencyMs}ms latency
                </span>
              </div>
              <span className="text-[11px] text-slate-400">Press Stop to interrupt</span>
            </div>
          )}

          {/* Textarea Container */}
          <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 shadow-lg focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all p-2">
            <textarea
              ref={textareaRef}
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message ${currentModel.name}... (Press Enter to send, Shift+Enter for newline, '/' for templates)`}
              rows={1}
              className="w-full px-3 py-1.5 text-sm bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 border-none outline-none resize-none leading-relaxed min-h-[44px]"
            />

            {/* Input Action Bar */}
            <div className="flex items-center justify-between pt-1 px-2 border-t border-slate-100 dark:border-slate-800/60">
              <div className="flex items-center gap-1.5">
                {/* Voice Input Button */}
                <button
                  type="button"
                  onClick={toggleVoiceRecording}
                  aria-label={isRecording ? "Stop voice recording" : "Start voice recording"}
                  className={cn(
                    "p-1.5 rounded-xl transition cursor-pointer flex items-center gap-1 text-xs",
                    isRecording
                      ? "bg-red-500 text-white animate-pulse"
                      : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                  title={isRecording ? "Listening..." : "Simulate Voice Input"}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  {isRecording && <span className="font-semibold text-[11px]">Listening...</span>}
                </button>

                {/* Templates shortcut button */}
                <button
                  type="button"
                  onClick={() => setIsPromptLibraryOpen(true)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs flex items-center gap-1 transition cursor-pointer"
                  title="Prompt Templates"
                >
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span className="hidden sm:inline text-[11px] text-slate-500">Templates</span>
                </button>
              </div>

              {/* Submit or Stop Button */}
              <div>
                {isStreaming ? (
                  <button
                    type="button"
                    onClick={stopStreaming}
                    aria-label="Stop generating"
                    className="p-2 rounded-xl bg-red-500 hover:bg-red-600 text-white transition flex items-center gap-1 text-xs font-semibold shadow-sm cursor-pointer"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Stop</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={!inputPrompt.trim()}
                    aria-label="Send message"
                    className="p-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition shadow-md shadow-indigo-500/20 active:scale-95 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="mt-2 text-center">
            <SampleDataBadge variant="subtle" text="Sample telemetry & multi-model engine" />
          </div>
        </div>
      </footer>

      {/* Prompt Library Modal */}
      <PromptLibraryModal
        isOpen={isPromptLibraryOpen}
        onClose={() => setIsPromptLibraryOpen(false)}
        onSelectPrompt={handleSelectTemplate}
      />
    </div>
  );
};

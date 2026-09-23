"use client";

import React, { useState } from "react";
import { ChatMessage } from "@/types";
import { CodeBlock } from "./CodeBlock";
import { SAMPLE_MODELS } from "@/data/models";
import {
  User,
  Bot,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Clock,
  Zap,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageItemProps {
  message: ChatMessage;
  onRate?: (rating: "like" | "dislike") => void;
  onRegenerate?: () => void;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  onRate,
  onRegenerate,
}) => {
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const isAssistant = message.role === "assistant";
  const model = SAMPLE_MODELS.find((m) => m.id === message.modelId);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleAudio = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const cleanText = message.content.replace(/```[\s\S]*?```/g, "Code block omitted.");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  // Basic markdown parser for code blocks, bold, headers, and lists
  const renderMarkdown = (text: string) => {
    const parts = text.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const firstLineBreak = part.indexOf("\n");
        const language = part.slice(3, firstLineBreak).trim() || "typescript";
        const code = part.slice(firstLineBreak + 1, -3);
        return <CodeBlock key={index} code={code} language={language} />;
      }

      // Format text lines
      const lines = part.split("\n");
      return (
        <div key={index} className="space-y-2 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base">
          {lines.map((line, lineIdx) => {
            if (!line.trim()) return <div key={lineIdx} className="h-1" />;

            if (line.startsWith("### ")) {
              return (
                <h4 key={lineIdx} className="text-base sm:text-lg font-bold text-slate-900 dark:text-white pt-2">
                  {formatInline(line.replace("### ", ""))}
                </h4>
              );
            }
            if (line.startsWith("#### ")) {
              return (
                <h5 key={lineIdx} className="text-sm sm:text-base font-bold text-slate-900 dark:text-white pt-1">
                  {formatInline(line.replace("#### ", ""))}
                </h5>
              );
            }
            if (line.startsWith("- ") || line.startsWith("* ")) {
              return (
                <li key={lineIdx} className="ml-4 list-disc text-slate-700 dark:text-slate-300">
                  {formatInline(line.replace(/^[-*]\s+/, ""))}
                </li>
              );
            }
            if (/^\d+\.\s/.test(line)) {
              return (
                <div key={lineIdx} className="ml-2 font-normal">
                  {formatInline(line)}
                </div>
              );
            }

            return <p key={lineIdx}>{formatInline(line)}</p>;
          })}
        </div>
      );
    });
  };

  const formatInline = (str: string) => {
    // Bold **text**
    const parts = str.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((seg, i) => {
      if (seg.startsWith("**") && seg.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-slate-900 dark:text-white">
            {seg.slice(2, -2)}
          </strong>
        );
      }
      if (seg.startsWith("`") && seg.endsWith("`")) {
        return (
          <code
            key={i}
            className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-mono text-xs sm:text-sm font-medium border border-slate-200 dark:border-slate-700/60"
          >
            {seg.slice(1, -1)}
          </code>
        );
      }
      return seg;
    });
  };

  return (
    <div
      className={cn(
        "py-6 px-4 sm:px-6 rounded-2xl transition-colors",
        isAssistant
          ? "bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-xs"
          : "bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30"
      )}
    >
      {/* Header info */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          {isAssistant ? (
            <div
              className={cn(
                "w-7 h-7 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-sm bg-gradient-to-br",
                model?.iconBg || "from-indigo-500 to-violet-600"
              )}
            >
              <Bot className="w-4 h-4" aria-hidden="true" />
            </div>
          ) : (
            <div className="w-7 h-7 rounded-xl flex items-center justify-center bg-indigo-600 text-white text-xs font-bold shadow-sm">
              <User className="w-4 h-4" aria-hidden="true" />
            </div>
          )}

          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-slate-900 dark:text-white">
              {isAssistant ? message.modelName || "EchoGPT Assistant" : "You"}
            </span>

            {isAssistant && model?.badge && (
              <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {model.badge}
              </span>
            )}
          </div>
        </div>

        {/* Timestamp & Telemetry */}
        <div className="flex items-center gap-3 text-xs text-slate-400">
          {message.tokens && (
            <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[11px] text-slate-500 dark:text-slate-400">
              <Zap className="w-3 h-3 text-amber-500" />
              {message.tokens} tokens
            </span>
          )}
          {message.latencyMs && (
            <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[11px] text-slate-500 dark:text-slate-400">
              <Clock className="w-3 h-3 text-indigo-400" />
              {message.latencyMs}ms
            </span>
          )}
        </div>
      </div>

      {/* Page Context Badge (if active context was shared) */}
      {message.pageContext && (
        <div className="mb-3 px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
          <Globe className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
          <span className="font-medium">Context:</span>
          <span className="truncate">{message.pageContext.title} ({message.pageContext.url})</span>
        </div>
      )}

      {/* Message Content */}
      <div className="prose dark:prose-invert max-w-none">
        {message.content ? (
          renderMarkdown(message.content)
        ) : (
          <div className="flex items-center gap-2 text-sm text-slate-400 animate-pulse py-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
            <span>Generating response...</span>
          </div>
        )}
      </div>

      {/* Footer Actions (Only for Assistant completed messages) */}
      {isAssistant && !message.isStreaming && message.content && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? "Copied" : "Copy response"}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition flex items-center gap-1 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={toggleAudio}
              aria-label={isPlayingAudio ? "Stop reading" : "Read aloud"}
              className={cn(
                "p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1 cursor-pointer",
                isPlayingAudio ? "text-indigo-500 font-semibold" : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              )}
            >
              {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isPlayingAudio ? "Stop" : "Listen"}</span>
            </button>
          </div>

          {/* Feedback Rating */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onRate?.("like")}
              aria-label="Thumbs up"
              className={cn(
                "p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer",
                message.rating === "like" ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onRate?.("dislike")}
              aria-label="Thumbs down"
              className={cn(
                "p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer",
                message.rating === "dislike" ? "text-red-500 bg-red-50 dark:bg-red-950/40" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

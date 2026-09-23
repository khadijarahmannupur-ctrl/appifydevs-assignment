"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@/hooks/useChat";
import { useAutoResizeTextarea } from "@/hooks/useAutoResizeTextarea";
import { ExtensionActiveTab } from "@/types";
import { QuickActionsHub } from "./QuickActionsHub";
import { ExtensionHistory } from "./ExtensionHistory";
import { ExtensionSettings } from "./ExtensionSettings";
import { PromptLibraryModal } from "@/components/webapp/PromptLibraryModal";
import { ModelSelector } from "@/components/webapp/ModelSelector";
import { MessageItem } from "@/components/webapp/MessageItem";
import { SampleDataBadge } from "@/components/common/SampleDataBadge";
import {
  MessageSquare,
  History,
  Zap,
  Settings,
  Send,
  Sparkles,
  Globe,
  Mic,
  MicOff,
  Maximize2,
  X,
  BookOpen,
  Square,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ExtensionPopupProps {
  isSidePanel?: boolean;
  onClose?: () => void;
  onToggleSidePanel?: () => void;
}

export const ExtensionPopup: React.FC<ExtensionPopupProps> = ({
  isSidePanel = false,
  onClose,
  onToggleSidePanel,
}) => {
  const chat = useChat();
  const [activeTab, setActiveTab] = useState<ExtensionActiveTab>("chat");
  const [inputPrompt, setInputPrompt] = useState("");
  const [includePageContext, setIncludePageContext] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isPromptLibraryOpen, setIsPromptLibraryOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useAutoResizeTextarea(textareaRef, inputPrompt, 40, 140);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.activeConversation.messages, chat.isStreaming]);

  const handleSend = () => {
    if (!inputPrompt.trim() || chat.isStreaming) return;

    const pageContext = includePageContext
      ? {
          url: "https://github.com/appifydevs/assignment",
          title: "AppifyDevs Frontend Internship Assignment (Next.js + TS)",
        }
      : undefined;

    chat.sendMessage(inputPrompt, undefined, pageContext);
    setInputPrompt("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === "/" && inputPrompt.trim() === "") {
      e.preventDefault();
      setIsPromptLibraryOpen(true);
    }
  };

  const quickPills = [
    { label: "📄 Summarize Page", prompt: "Summarize the key requirements and tech stack of this repository." },
    { label: "🔍 Explain Selection", prompt: "Explain the architectural advantages of using Next.js App Router for side panels." },
    { label: "📋 Action Items", prompt: "Extract all internship deliverable requirements into an actionable checklist." },
  ];

  const toggleVoice = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setTimeout(() => {
        setInputPrompt("Summarize the AppifyDevs internship requirements from this page.");
        setIsRecording(false);
      }, 1800);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-white dark:bg-[#0B0F19] border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden transition-all",
        isSidePanel
          ? "w-full h-full rounded-none"
          : "w-full max-w-[420px] h-[620px] rounded-3xl"
      )}
    >
      {/* Top Header */}
      <header className="px-3.5 py-2.5 bg-slate-50/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-900 dark:text-white">EchoGPT</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-200/60 dark:border-indigo-800/60">
                {isSidePanel ? "Side Panel" : "Popup"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Model Switcher */}
          <ModelSelector
            selectedModelId={chat.activeModelId}
            onSelectModel={chat.setActiveModelId}
          />

          {/* Toggle Side Panel / Popup View */}
          {onToggleSidePanel && (
            <button
              type="button"
              onClick={onToggleSidePanel}
              aria-label={isSidePanel ? "Switch to popup view" : "Switch to side panel view"}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title={isSidePanel ? "Switch to 400x600 Popup" : "Dock to Side Panel (420px)"}
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close extension"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </header>

      {/* Page Context Banner */}
      {includePageContext && activeTab === "chat" && (
        <div className="px-3 py-1.5 bg-indigo-50/60 dark:bg-indigo-950/30 border-b border-indigo-100/60 dark:border-indigo-900/30 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300 shrink-0">
          <div className="flex items-center gap-1.5 truncate pr-2">
            <Globe className="w-3 h-3 text-indigo-500 shrink-0" />
            <span className="truncate font-medium">
              Reading: <strong>github.com/appifydevs/assignment</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIncludePageContext(false)}
            className="text-[10px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 underline cursor-pointer shrink-0"
          >
            Detach
          </button>
        </div>
      )}

      {/* Main Tab Body */}
      <div className="flex-1 overflow-hidden">
        {/* TAB 1: CHAT */}
        {activeTab === "chat" && (
          <div className="flex flex-col h-full overflow-hidden">
            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {chat.activeConversation.messages.map((msg) => (
                <MessageItem
                  key={msg.id}
                  message={msg}
                  onRate={(rating) => chat.rateMessage(msg.id, rating)}
                />
              ))}
              <div ref={messagesEndRef} className="h-2" />
            </div>

            {/* Quick Pills Bar */}
            <div className="px-3 py-1.5 bg-slate-50/60 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              {quickPills.map((pill, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setInputPrompt(pill.prompt);
                    textareaRef.current?.focus();
                  }}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/80 dark:border-slate-700/60 shrink-0 transition cursor-pointer select-none"
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Prompt Input Dock */}
            <div className="p-2.5 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shrink-0">
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-2 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition">
                <textarea
                  ref={textareaRef}
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Ask about this page or prompt ${chat.currentModel.shortName}... ('/' for templates)`}
                  rows={1}
                  className="w-full text-xs bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 border-none outline-none resize-none leading-relaxed min-h-[38px]"
                />

                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                  <div className="flex items-center gap-1">
                    {/* Voice simulation */}
                    <button
                      type="button"
                      onClick={toggleVoice}
                      aria-label="Simulate voice input"
                      className={cn(
                        "p-1 rounded-lg transition cursor-pointer",
                        isRecording
                          ? "bg-red-500 text-white animate-pulse"
                          : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                      )}
                      title="Simulate Voice Input"
                    >
                      {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                    </button>

                    {/* Templates */}
                    <button
                      type="button"
                      onClick={() => setIsPromptLibraryOpen(true)}
                      className="p-1 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-slate-200 dark:hover:bg-slate-700 text-[11px] flex items-center gap-0.5 cursor-pointer"
                      title="Templates (/)"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                      <span className="text-[10px] text-slate-500">Templates</span>
                    </button>
                  </div>

                  <div>
                    {chat.isStreaming ? (
                      <button
                        type="button"
                        onClick={chat.stopStreaming}
                        className="p-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Square className="w-3 h-3 fill-current" />
                        <span>Stop</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSend}
                        disabled={!inputPrompt.trim()}
                        aria-label="Send prompt"
                        className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 transition shadow-xs cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HISTORY */}
        {activeTab === "history" && (
          <ExtensionHistory
            conversations={chat.conversations}
            onSelectConv={(id) => {
              chat.setActiveConvId(id);
              setActiveTab("chat");
            }}
            onTogglePin={chat.togglePinConversation}
            onDeleteConv={chat.deleteConversation}
          />
        )}

        {/* TAB 3: ACTIONS */}
        {activeTab === "actions" && (
          <QuickActionsHub
            onExecuteAction={(title, result) => {
              // Also add to chat stream for continuity
              chat.sendMessage(`Run 1-Click Action: ${title}`);
              setActiveTab("chat");
            }}
          />
        )}

        {/* TAB 4: SETTINGS */}
        {activeTab === "settings" && <ExtensionSettings />}
      </div>

      {/* BOTTOM TAB NAVIGATION BAR */}
      <nav
        aria-label="Extension Bottom Navigation"
        className="px-2 py-1.5 bg-slate-50/95 dark:bg-slate-900/95 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-around shrink-0 text-xs"
      >
        <button
          type="button"
          onClick={() => setActiveTab("chat")}
          className={cn(
            "flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition cursor-pointer select-none",
            activeTab === "chat"
              ? "text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50/80 dark:bg-indigo-950/60"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          )}
        >
          <MessageSquare className="w-4 h-4" />
          <span className="text-[10px]">Chat</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("history")}
          className={cn(
            "flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition cursor-pointer select-none",
            activeTab === "history"
              ? "text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50/80 dark:bg-indigo-950/60"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          )}
        >
          <History className="w-4 h-4" />
          <span className="text-[10px]">History</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("actions")}
          className={cn(
            "flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition cursor-pointer select-none",
            activeTab === "actions"
              ? "text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50/80 dark:bg-indigo-950/60"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          )}
        >
          <Zap className="w-4 h-4" />
          <span className="text-[10px]">Actions</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("settings")}
          className={cn(
            "flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition cursor-pointer select-none",
            activeTab === "settings"
              ? "text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50/80 dark:bg-indigo-950/60"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          )}
        >
          <Settings className="w-4 h-4" />
          <span className="text-[10px]">Settings</span>
        </button>
      </nav>

      {/* Prompt Library Modal */}
      <PromptLibraryModal
        isOpen={isPromptLibraryOpen}
        onClose={() => setIsPromptLibraryOpen(false)}
        onSelectPrompt={(tmpl) => {
          setInputPrompt(tmpl.prompt);
          if (tmpl.modelSuggestion) {
            chat.setActiveModelId(tmpl.modelSuggestion);
          }
        }}
      />
    </div>
  );
};

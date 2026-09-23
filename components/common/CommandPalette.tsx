"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bot,
  Sparkles,
  Home,
  MessageSquare,
  Sun,
  Moon,
  Keyboard,
  ArrowRight,
  Code,
  FileText,
} from "lucide-react";
import { ChromeIcon } from "@/components/common/BrandIcons";
import { SAMPLE_MODELS } from "@/data/models";
import { SAMPLE_PROMPT_TEMPLATES } from "@/data/prompts";
import { useTheme } from "next-themes";
import { AIModel, PromptTemplate } from "@/types";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModel?: (modelId: string) => void;
  onSelectPrompt?: (template: PromptTemplate) => void;
  onOpenShortcuts?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectModel,
  onSelectPrompt,
  onOpenShortcuts,
}) => {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredModels = SAMPLE_MODELS.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.providerName.toLowerCase().includes(query.toLowerCase()) ||
      m.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPrompts = SAMPLE_PROMPT_TEMPLATES.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleNavigate = (path: string) => {
    router.push(path);
    onClose();
  };

  const handleModelClick = (model: AIModel) => {
    if (onSelectModel) {
      onSelectModel(model.id);
    } else {
      router.push("/app");
    }
    onClose();
  };

  const handlePromptClick = (template: PromptTemplate) => {
    if (onSelectPrompt) {
      onSelectPrompt(template);
    } else {
      router.push("/app");
    }
    onClose();
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ type: "spring", duration: 0.25, bounce: 0.1 }}
          className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800 gap-3">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command, model name, or prompt category..."
              className="w-full py-4 text-base bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            <kbd className="px-2 py-1 text-xs font-mono rounded bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700">
              ESC
            </kbd>
          </div>

          {/* Results Container */}
          <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
            {/* Quick Navigation */}
            <div>
              <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase px-2 mb-1.5">
                Navigation
              </p>
              <div className="space-y-1">
                <button
                  onClick={() => handleNavigate("/")}
                  className="w-full flex items-center justify-between p-2 rounded-xl text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Home className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                    <span>Landing Page</span>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition text-indigo-500" />
                </button>
                <button
                  onClick={() => handleNavigate("/app")}
                  className="w-full flex items-center justify-between p-2 rounded-xl text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                    <span>EchoGPT Web App Redesign</span>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition text-indigo-500" />
                </button>
                <button
                  onClick={() => handleNavigate("/extension")}
                  className="w-full flex items-center justify-between p-2 rounded-xl text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <ChromeIcon className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                    <span>Chrome Extension Prototype (~400x600 & Side Panel)</span>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition text-indigo-500" />
                </button>
              </div>
            </div>

            {/* AI Models */}
            {filteredModels.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase px-2 mb-1.5">
                  Frontier AI Models
                </p>
                <div className="space-y-1">
                  {filteredModels.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => handleModelClick(model)}
                      className="w-full flex items-center justify-between p-2 rounded-xl text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${model.iconBg} flex items-center justify-center text-white text-[10px] font-bold`}>
                          {model.shortName.slice(0, 2)}
                        </div>
                        <div>
                          <span className="font-medium text-slate-900 dark:text-white group-hover:text-indigo-500">
                            {model.name}
                          </span>
                          <span className="text-xs text-slate-400 ml-2">({model.providerName})</span>
                        </div>
                      </div>
                      <span className="text-xs text-indigo-600 dark:text-indigo-400 font-mono">
                        {model.tokensPerSec} t/s
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Prompt Templates */}
            {filteredPrompts.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase px-2 mb-1.5">
                  Prompt Library
                </p>
                <div className="space-y-1">
                  {filteredPrompts.slice(0, 5).map((tmpl) => (
                    <button
                      key={tmpl.id}
                      onClick={() => handlePromptClick(tmpl)}
                      className="w-full flex items-center justify-between p-2 rounded-xl text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        {tmpl.category === "Coding" ? (
                          <Code className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <FileText className="w-4 h-4 text-indigo-500 shrink-0" />
                        )}
                        <span className="truncate font-medium group-hover:text-indigo-500">
                          {tmpl.title}
                        </span>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0">
                        {tmpl.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Utility Actions */}
            <div>
              <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase px-2 mb-1.5">
                Quick Actions
              </p>
              <div className="space-y-1">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between p-2 rounded-xl text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    {resolvedTheme === "dark" ? (
                      <Sun className="w-4 h-4 text-amber-500" />
                    ) : (
                      <Moon className="w-4 h-4 text-indigo-500" />
                    )}
                    <span>Toggle {resolvedTheme === "dark" ? "Light" : "Dark"} Mode</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onOpenShortcuts?.();
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-xl text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Keyboard className="w-4 h-4 text-purple-500" />
                    <span>View Keyboard Shortcuts</span>
                  </div>
                  <kbd className="px-1.5 py-0.5 text-xs font-mono rounded bg-slate-100 dark:bg-slate-800 text-slate-400">
                    ?
                  </kbd>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

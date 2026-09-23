"use client";

import React, { useState } from "react";
import { ExtensionPopup } from "./ExtensionPopup";
import { InPageCopilot } from "./InPageCopilot";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { SampleDataBadge } from "@/components/common/SampleDataBadge";
import { GithubIcon } from "@/components/common/BrandIcons";
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Lock,
  Star,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const BrowserMockup: React.FC = () => {
  const [viewMode, setViewMode] = useState<"sidepanel" | "popup">("sidepanel");
  const [isExtensionOpen, setIsExtensionOpen] = useState(true);

  return (
    <div className="w-full max-w-7xl mx-auto rounded-3xl overflow-hidden border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl flex flex-col min-h-[750px]">
      {/* 1. Chrome Window Top Tab & Title Bar */}
      <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 select-none">
        {/* Window controls & Tab */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>

          {/* Active Tab */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-t-xl bg-white dark:bg-[#0B0F19] text-xs font-medium text-slate-800 dark:text-slate-200 border-t border-x border-slate-200 dark:border-slate-800 shadow-xs">
            <GithubIcon className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
            <span className="truncate max-w-[200px]">appifydevs/assignment • GitHub</span>
          </div>
        </div>

        {/* View Mode Switcher Pills */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-text text-xs text-slate-500 dark:text-slate-400">
            Mode:
          </span>
          <div className="inline-flex p-0.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-xs">
            <button
              type="button"
              onClick={() => {
                setViewMode("sidepanel");
                setIsExtensionOpen(true);
              }}
              className={cn(
                "px-2.5 py-1 rounded-md font-medium transition cursor-pointer select-none",
                viewMode === "sidepanel"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-semibold shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              )}
            >
              Side Panel (420px)
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode("popup");
                setIsExtensionOpen(true);
              }}
              className={cn(
                "px-2.5 py-1 rounded-md font-medium transition cursor-pointer select-none",
                viewMode === "popup"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-semibold shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              )}
            >
              Popup Frame (~400x600)
            </button>
          </div>
        </div>
      </div>

      {/* 2. Chrome URL Bar & Extension Toolbar */}
      <div className="bg-slate-50 dark:bg-slate-900/60 px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-slate-500 text-xs select-none">
        <div className="flex items-center gap-2">
          <button className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800">
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800">
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* Omnibox / URL */}
        <div className="flex-1 max-w-xl mx-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center gap-2 shadow-xs">
          <Lock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span className="text-slate-400">https://</span>
          <span className="text-slate-800 dark:text-slate-200 font-medium truncate">
            github.com/appifydevs/assignment
          </span>
          <Star className="w-3.5 h-3.5 text-slate-400 ml-auto hover:text-amber-500 cursor-pointer" />
        </div>

        {/* Extension Icons Dock */}
        <div className="flex items-center gap-2 shrink-0">
          {/* EchoGPT Extension Pinned Icon */}
          <button
            type="button"
            onClick={() => setIsExtensionOpen(!isExtensionOpen)}
            aria-label="Toggle EchoGPT Side Panel"
            className={cn(
              "flex items-center gap-1 px-2.5 py-1 rounded-lg border transition shadow-xs cursor-pointer select-none",
              isExtensionOpen
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50"
            )}
            title="Toggle EchoGPT (Ctrl+Shift+E)"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-semibold text-[11px]">EchoGPT</span>
            <kbd className="hidden sm:inline px-1 py-0.2 rounded bg-black/20 text-[9px] font-mono ml-0.5">
              ⌃⇧E
            </kbd>
          </button>

          <ThemeToggle size="sm" />
        </div>
      </div>

      {/* 3. Browser Viewport Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative min-h-[580px]">
        {/* Left Simulated Webpage Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 bg-white dark:bg-slate-950">
          {/* GitHub Repo Header Mockup */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <GithubIcon className="w-4 h-4" />
              <span className="hover:underline cursor-pointer">appifydevs</span>
              <span>/</span>
              <span className="font-bold text-slate-900 dark:text-white">assignment</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 dark:bg-slate-800 font-medium">
                Public
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              AppifyDevs Frontend Internship Test Assignment
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Redesign and build the EchoGPT multi-model AI suite with Next.js, TypeScript, Tailwind, and Chrome Side Panel.
            </p>
          </div>

          {/* Interactive In-Page Copilot Demo Section */}
          <InPageCopilot sampleText="Highlighting any text triggers the floating EchoGPT copilot for instant 1-click answers." />

          {/* Webpage Content Body */}
          <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              📋 Core Project Deliverables
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>1. Web App Redesign (`/app`)</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Multi-model switching (GPT-4o, Claude 3.5, Gemini 1.5, DeepSeek), token streaming telemetry, Dual-Model Arena, 20+ prompt templates, and `Cmd+K` palette.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>2. Landing Page (`/`)</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Single-page product landing with live interactive preview, model latency matrix, comparison matrix, pricing calculator, and FAQ accordion.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>3. Chrome Extension Concept (`/extension`)</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Dual mode (Side Panel 420px + Popup ~400x600), bottom tab navigation (Chat, History, Actions, Settings), 1-click summarizer, and in-page copilot.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>4. Accessibility & Performance</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  WCAG 2.1 AA compliant keyboard navigation, dark/light theme, polite screen reader completion announcements, and strict TypeScript.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Panel / Floating Popup Area */}
        {isExtensionOpen && (
          <>
            {/* Mode A: Docked Side Panel (420px) */}
            {viewMode === "sidepanel" && (
              <aside className="w-full lg:w-[420px] shrink-0 h-full border-t lg:border-t-0 lg:border-l border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0B0F19] z-20">
                <ExtensionPopup
                  isSidePanel={true}
                  onClose={() => setIsExtensionOpen(false)}
                  onToggleSidePanel={() => setViewMode("popup")}
                />
              </aside>
            )}

            {/* Mode B: Floating Popup Window (~400x600) */}
            {viewMode === "popup" && (
              <div className="fixed inset-0 lg:absolute lg:inset-auto lg:top-4 lg:right-4 z-40 flex items-center justify-center p-4">
                <div
                  onClick={() => setIsExtensionOpen(false)}
                  className="fixed inset-0 bg-slate-950/40 lg:hidden"
                />
                <div className="relative z-10 shadow-2xl animate-in zoom-in-95 duration-150">
                  <ExtensionPopup
                    isSidePanel={false}
                    onClose={() => setIsExtensionOpen(false)}
                    onToggleSidePanel={() => setViewMode("sidepanel")}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

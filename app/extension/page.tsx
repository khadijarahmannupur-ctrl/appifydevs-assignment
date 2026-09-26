"use client";

import React from "react";
import Link from "next/link";
import { BrowserMockup } from "@/components/extension/BrowserMockup";
import { SampleDataBadge } from "@/components/common/SampleDataBadge";
import { Button } from "@/components/common/Button";
import { ChromeIcon } from "@/components/common/BrandIcons";
import {
  ArrowLeft,
  Sparkles,
  Layers,
  Zap,
  MousePointerClick,
  CheckCircle2,
} from "lucide-react";

export default function ExtensionPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 flex flex-col w-full max-w-full overflow-x-hidden">
      {/* Top Banner Notice */}
      <SampleDataBadge variant="banner" />

      {/* Top Header Navigation */}
      <header className="px-3 sm:px-8 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between gap-2 sm:gap-4 w-full max-w-full min-w-0">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Landing</span>
          </Link>
          <span className="text-slate-300 dark:text-slate-700 hidden xs:inline">/</span>
          <div className="flex items-center gap-1.5 sm:gap-2 truncate min-w-0">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white text-xs font-bold shadow-xs shrink-0">
              <ChromeIcon className="w-3.5 h-3.5" />
            </div>
            <h1 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate min-w-0">
              EchoGPT Extension Prototype
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link href="/app">
            <Button size="sm" variant="outline" className="text-xs px-2.5 py-1 sm:px-3 sm:py-1.5">
              <span className="hidden sm:inline">Open Full Web App →</span>
              <span className="sm:hidden">Web App →</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Extension Showcase Container */}
      <main id="main-content" className="flex-1 p-3.5 sm:p-8 max-w-7xl mx-auto w-full space-y-6 sm:space-y-8 min-w-0">
        {/* Intro Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Chrome Side Panel & Popup Concept</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            AI Multi-Model Intelligence inside your Browser
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Experience the Chrome Side Panel API with active DOM context, 1-click page summarizer, bottom tab navigation (Chat, History, Actions, Settings), and the new In-Page Floating Copilot.
          </p>
        </div>

        {/* Interactive Browser Simulation */}
        <BrowserMockup />

        {/* Architecture Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 w-fit">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Side Panel + Popup Dual Ergonomics
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Designed around Chrome&apos;s Side Panel API for persistent research, with quick toggle to a 400x600 floating popup modal.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 w-fit">
              <MousePointerClick className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              In-Page Highlight Floating Copilot
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Selecting text on any page summons a discreet action bubble for instant explanation, TL;DR extraction, and translation.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 w-fit">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              1-Click Page Summaries & Actions
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Instant action hub to extract deliverables, fix grammar, translate, or generate executive summaries in seconds.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>EchoGPT Chrome Extension Concept • Built with Next.js 14, TypeScript & Tailwind CSS for AppifyDevs</p>
      </footer>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/common/Button";
import { SampleDataBadge } from "@/components/common/SampleDataBadge";
import { ChromeIcon } from "@/components/common/BrandIcons";
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  Zap,
  ShieldCheck,
  Star,
  CheckCircle2,
} from "lucide-react";
import confetti from "canvas-confetti";

export const Hero: React.FC = () => {
  const [activePromptIndex, setActivePromptIndex] = useState(0);

  const samplePrompts = [
    "Refactor this React 19 component with Tailwind CSS and accessibility",
    "Summarize this 20-page research paper with key takeaways in 30 seconds",
    "Write an authentic Frontend Internship cover letter for AppifyDevs",
    "Compare GPT-4o vs Claude 3.5 Sonnet on this system design problem",
  ];

  const handleInstallClick = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
      {/* Ambient Gradient Glow Backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[500px] bg-gradient-to-tr from-indigo-500/20 via-violet-500/15 to-cyan-500/20 blur-[120px] -z-10 pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-8">
        {/* Sample Data Disclaimer & Product Badge */}
        <div className="flex flex-col items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Multi-Model AI Productivity Assistant</span>
          </div>
          <SampleDataBadge variant="subtle" text="Sample performance telemetry & model suite" />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] max-w-4xl mx-auto">
          All Frontier AI Models.{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">
            One Persistent Side Panel.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Switch effortlessly between <strong>GPT-4o</strong>, <strong>Claude 3.5 Sonnet</strong>, <strong>Gemini 1.5 Pro</strong>, and <strong>DeepSeek R1</strong> without leaving your current browser tab.
        </p>

        {/* Dynamic Interactive Prompt Pill */}
        <div className="max-w-xl mx-auto p-1.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-lg flex items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-2 pl-3 truncate">
            <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
            <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 truncate font-mono">
              &quot;{samplePrompts[activePromptIndex]}&quot;
            </span>
          </div>
          <button
            type="button"
            onClick={() =>
              setActivePromptIndex((prev) => (prev + 1) % samplePrompts.length)
            }
            className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition shrink-0 cursor-pointer"
          >
            Next Prompt →
          </button>
        </div>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link href="/app" className="w-full sm:w-auto">
            <Button
              size="lg"
              leftIcon={<MessageSquare className="w-5 h-5" />}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto text-base shadow-lg shadow-indigo-500/25"
            >
              Launch Web App
            </Button>
          </Link>

          <Link href="/extension" className="w-full sm:w-auto" onClick={handleInstallClick}>
            <Button
              size="lg"
              variant="glass"
              leftIcon={<ChromeIcon className="w-5 h-5 text-indigo-500" />}
              className="w-full sm:w-auto text-base border-slate-300 dark:border-slate-700"
            >
              Try Chrome Extension
            </Button>
          </Link>
        </div>

        {/* Social Proof & Trust Badges */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800/60 max-w-3xl mx-auto">
          <div className="flex items-center gap-1.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="font-semibold text-slate-800 dark:text-slate-200">4.9/5</span>
            <span>(50,000+ power users)</span>
          </div>

          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Chrome Side Panel API Native</span>
          </div>

          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-500" />
            <span>Zero-Data Retention Privacy</span>
          </div>
        </div>
      </div>
    </section>
  );
};

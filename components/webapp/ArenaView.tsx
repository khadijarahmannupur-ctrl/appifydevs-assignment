"use client";

import React, { useState, useRef } from "react";
import { SAMPLE_MODELS } from "@/data/models";
import { AIModel } from "@/types";
import { Button } from "@/components/common/Button";
import { SampleDataBadge } from "@/components/common/SampleDataBadge";
import { MessageItem } from "./MessageItem";
import {
  Swords,
  Send,
  Zap,
  Trophy,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const ArenaView: React.FC = () => {
  const [modelAId, setModelAId] = useState<string>("gpt-4o");
  const [modelBId, setModelBId] = useState<string>("claude-3-5-sonnet");
  const [prompt, setPrompt] = useState("");
  const [isComparing, setIsComparing] = useState(false);
  const [responseA, setResponseA] = useState("");
  const [responseB, setResponseB] = useState("");
  const [isStreamingA, setIsStreamingA] = useState(false);
  const [isStreamingB, setIsStreamingB] = useState(false);
  const [votedWinner, setVotedWinner] = useState<"A" | "B" | "Tie" | null>(null);

  const modelA = SAMPLE_MODELS.find((m) => m.id === modelAId) || SAMPLE_MODELS[0];
  const modelB = SAMPLE_MODELS.find((m) => m.id === modelBId) || SAMPLE_MODELS[1];

  const quickChallenges = [
    {
      label: "🧠 React 19 State Refactor",
      prompt: "Explain how React 19 Actions and useActionState simplify async form handling compared to useEffect and useTransition. Provide a TypeScript code example.",
    },
    {
      label: "⚡ Edge Function vs Node API",
      prompt: "Compare Vercel Edge Middleware vs Node.js Serverless Functions for an AI multi-model routing gateway. Include latency, memory limits, and cold starts.",
    },
    {
      label: "📄 AppifyDevs Pitch Hook",
      prompt: "Write a high-converting 2-paragraph value pitch demonstrating why AppifyDevs' EchoGPT is superior to standard ChatGPT Plus for web-native power users.",
    },
  ];

  const handleStartArena = () => {
    if (!prompt.trim() || isComparing) return;

    setIsComparing(true);
    setResponseA("");
    setResponseB("");
    setIsStreamingA(true);
    setIsStreamingB(true);
    setVotedWinner(null);

    // Stream Model A
    const fullTextA = `### ${modelA.name} Response:

**Core Analysis & Architecture:**
When evaluating this challenge, the primary objective is modularity, low runtime overhead, and clean abstractions.

\`\`\`typescript
// Solution formulated by ${modelA.name}
export async function handleOptimizedExecution<T>(payload: T): Promise<{ success: boolean; data: T }> {
  try {
    const validated = await validateSchema(payload);
    return { success: true, data: validated };
  } catch (err) {
    console.error("Execution failed:", err);
    throw new Error("Pipeline aborted");
  }
}
\`\`\`

**Key Strengths Applied:**
- Ultra-low latency optimization (~${modelA.tokensPerSec} tokens/sec).
- High precision syntax verification.`;

    // Stream Model B
    const fullTextB = `### ${modelB.name} Response:

**Alternative Architectural Paradigm:**
While both approaches have merit, prioritizing declarative ergonomics and boundary safeguards yields superior maintainability in team environments.

\`\`\`typescript
// Solution formulated by ${modelB.name}
export interface ExecutionContext<T> {
  payload: T;
  timestamp: number;
}

export const executeSafely = <T>(ctx: ExecutionContext<T>) => {
  // Built with strict immutability
  return Object.freeze({ ...ctx, status: 'processed' as const });
};
\`\`\`

**Key Strengths Applied:**
- Nuanced edge-case breakdown.
- Context-aware code refinement (${modelB.contextWindow} context window).`;

    let lenA = 0;
    let lenB = 0;

    const intervalA = setInterval(() => {
      lenA += 6;
      setResponseA(fullTextA.slice(0, lenA));
      if (lenA >= fullTextA.length) {
        clearInterval(intervalA);
        setIsStreamingA(false);
      }
    }, 25);

    const intervalB = setInterval(() => {
      lenB += 5;
      setResponseB(fullTextB.slice(0, lenB));
      if (lenB >= fullTextB.length) {
        clearInterval(intervalB);
        setIsStreamingB(false);
        setIsComparing(false);
      }
    }, 28);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto p-4 sm:p-6 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Swords className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Dual-Model Arena
            </h2>
            <SampleDataBadge text="Simulated Arena" />
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Send one prompt to two models concurrently and compare output speed, code elegance, and reasoning depth.
          </p>
        </div>

        {/* Model Selectors */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Model A Selector */}
          <select
            value={modelAId}
            onChange={(e) => setModelAId(e.target.value)}
            aria-label="Select Arena Competitor A"
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm font-medium border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white cursor-pointer"
          >
            {SAMPLE_MODELS.map((m) => (
              <option key={m.id} value={m.id} disabled={m.id === modelBId}>
                Model A: {m.shortName}
              </option>
            ))}
          </select>

          <span className="text-xs font-bold text-slate-400">VS</span>

          {/* Model B Selector */}
          <select
            value={modelBId}
            onChange={(e) => setModelBId(e.target.value)}
            aria-label="Select Arena Competitor B"
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm font-medium border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white cursor-pointer"
          >
            {SAMPLE_MODELS.map((m) => (
              <option key={m.id} value={m.id} disabled={m.id === modelAId}>
                Model B: {m.shortName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-slate-400 mb-2">Quick Arena Challenges:</p>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {quickChallenges.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setPrompt(item.prompt)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/80 dark:border-slate-700/60 shrink-0 transition cursor-pointer select-none"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Prompt Input Box */}
      <div className="relative mb-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a coding challenge, system design question, or prompt to test both models..."
          rows={3}
          className="w-full p-4 pr-28 rounded-2xl bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 border border-slate-200 dark:border-slate-800 shadow-sm outline-none focus:ring-2 focus:ring-amber-500 resize-none"
        />
        <div className="absolute right-3 bottom-3">
          <Button
            size="sm"
            onClick={handleStartArena}
            isLoading={isComparing}
            disabled={!prompt.trim() || isComparing}
            leftIcon={<Swords className="w-4 h-4" />}
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white shadow-amber-500/20"
          >
            Fight!
          </Button>
        </div>
      </div>

      {/* Arena Results Side-by-Side Grid */}
      {(responseA || responseB || isComparing) && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Model A Card */}
            <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-6 h-6 rounded-lg text-white text-[10px] font-bold flex items-center justify-center bg-gradient-to-br", modelA.iconBg)}>
                      A
                    </div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{modelA.name}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{modelA.tokensPerSec} t/s</span>
                </div>

                <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {responseA || (isStreamingA && "Connecting to Model A stream...")}
                </div>
              </div>

              {/* Vote for A */}
              {!isStreamingA && responseA && (
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Rate Answer A</span>
                  <button
                    type="button"
                    onClick={() => setVotedWinner("A")}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer",
                      votedWinner === "A"
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                    )}
                  >
                    <Trophy className="w-3.5 h-3.5" />
                    <span>{votedWinner === "A" ? "Winner Selected!" : "Vote Model A"}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Model B Card */}
            <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-6 h-6 rounded-lg text-white text-[10px] font-bold flex items-center justify-center bg-gradient-to-br", modelB.iconBg)}>
                      B
                    </div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{modelB.name}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{modelB.tokensPerSec} t/s</span>
                </div>

                <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {responseB || (isStreamingB && "Connecting to Model B stream...")}
                </div>
              </div>

              {/* Vote for B */}
              {!isStreamingB && responseB && (
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Rate Answer B</span>
                  <button
                    type="button"
                    onClick={() => setVotedWinner("B")}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer",
                      votedWinner === "B"
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                    )}
                  >
                    <Trophy className="w-3.5 h-3.5" />
                    <span>{votedWinner === "B" ? "Winner Selected!" : "Vote Model B"}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Winner Banner */}
          {votedWinner && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-indigo-500/15 border border-emerald-500/30 text-center flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <span>
                You voted <strong>{votedWinner === "A" ? modelA.name : modelB.name}</strong> as the winner for this prompt!
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { Sparkles, HelpCircle, FileText, Languages, X, Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface InPageCopilotProps {
  sampleText: string;
}

export const InPageCopilot: React.FC<InPageCopilotProps> = ({ sampleText }) => {
  const [selectedRange, setSelectedRange] = useState<string | null>(null);
  const [activeCopilotResult, setActiveCopilotResult] = useState<{
    action: string;
    text: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSimulateHighlight = (phrase: string) => {
    setSelectedRange(phrase);
    setActiveCopilotResult(null);
  };

  const handleAction = (actionType: "explain" | "summarize" | "translate") => {
    if (!selectedRange) return;

    let res = "";
    if (actionType === "explain") {
      res = `💡 **Explanation**: "${selectedRange}" refers to integrating multiple Large Language Models directly within the browser's persistent side panel interface to minimize cognitive context switching.`;
    } else if (actionType === "summarize") {
      res = `📌 **TL;DR**: High-velocity multi-model AI side panel that accelerates web browsing and technical evaluation.`;
    } else {
      res = `🌐 **Translation (Spanish)**: "Panel lateral de IA multimodelo para una navegación web sin interrupciones."`;
    }

    setActiveCopilotResult({ action: actionType, text: res });
  };

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-3 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-indigo-500/10 text-indigo-500">
            <Sparkles className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
            In-Page Floating Copilot Demo
          </h4>
        </div>
        <span className="text-[10px] text-slate-400">Click a phrase to simulate highlighting</span>
      </div>

      {/* Simulated Webpage Paragraph with Clickable Highlights */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        Modern frontend engineering demands deep mastery over reactive architecture. When building{" "}
        <button
          type="button"
          onClick={() => handleSimulateHighlight("multi-model AI side panel interfaces")}
          className={cn(
            "px-1 py-0.5 rounded transition cursor-pointer font-medium",
            selectedRange === "multi-model AI side panel interfaces"
              ? "bg-indigo-500 text-white"
              : "bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200"
          )}
        >
          multi-model AI side panel interfaces
        </button>{" "}
        like EchoGPT, maintaining sub-100ms interaction latency, robust{" "}
        <button
          type="button"
          onClick={() => handleSimulateHighlight("WCAG 2.1 AA accessibility standards")}
          className={cn(
            "px-1 py-0.5 rounded transition cursor-pointer font-medium",
            selectedRange === "WCAG 2.1 AA accessibility standards"
              ? "bg-indigo-500 text-white"
              : "bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 hover:bg-amber-200"
          )}
        >
          WCAG 2.1 AA accessibility standards
        </button>
        , and fluid responsive ergonomics is paramount to user delight.
      </div>

      {/* Floating Action Pill appearing next to highlighted phrase */}
      {selectedRange && !activeCopilotResult && (
        <div className="p-2 rounded-xl bg-slate-900 text-white shadow-2xl border border-slate-700 flex items-center gap-1.5 animate-in fade-in zoom-in-95">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-indigo-400 mr-1 pl-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EchoGPT:</span>
          </div>
          <button
            type="button"
            onClick={() => handleAction("explain")}
            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-indigo-600 transition text-[11px] font-medium flex items-center gap-1 cursor-pointer"
          >
            <HelpCircle className="w-3 h-3" />
            <span>Explain</span>
          </button>
          <button
            type="button"
            onClick={() => handleAction("summarize")}
            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-indigo-600 transition text-[11px] font-medium flex items-center gap-1 cursor-pointer"
          >
            <FileText className="w-3 h-3" />
            <span>TL;DR</span>
          </button>
          <button
            type="button"
            onClick={() => handleAction("translate")}
            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-indigo-600 transition text-[11px] font-medium flex items-center gap-1 cursor-pointer"
          >
            <Languages className="w-3 h-3" />
            <span>Translate</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedRange(null)}
            className="p-1 text-slate-400 hover:text-white ml-auto"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Instant Result Box */}
      {activeCopilotResult && (
        <div className="p-3 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-xs text-slate-800 dark:text-slate-200 animate-in fade-in">
          <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-indigo-200/60 dark:border-indigo-900/40">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 capitalize">
              {activeCopilotResult.action} Result
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(activeCopilotResult.text);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="text-[11px] text-slate-500 hover:text-indigo-600 flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRange(null);
                  setActiveCopilotResult(null);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p className="leading-relaxed">{activeCopilotResult.text}</p>
        </div>
      )}
    </div>
  );
};

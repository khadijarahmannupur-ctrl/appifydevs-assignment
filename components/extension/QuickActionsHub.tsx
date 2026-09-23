"use client";

import React, { useState } from "react";
import {
  FileText,
  HelpCircle,
  CheckCircle,
  ListTodo,
  Languages,
  Sparkles,
  Zap,
  Copy,
  Check,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/common/Button";
import { SampleDataBadge } from "@/components/common/SampleDataBadge";
import { cn } from "@/lib/utils";

interface QuickActionItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  actionName: string;
  color: string;
}

const ACTIONS: QuickActionItem[] = [
  {
    id: "summarize-page",
    title: "1-Click Page Summarizer",
    description: "Extract core ideas, bulleted key takeaways, and time savings from the active web page.",
    icon: <FileText className="w-4 h-4 text-indigo-500" />,
    actionName: "Summarize Page",
    color: "from-indigo-500 to-violet-600",
  },
  {
    id: "explain-selection",
    title: "Explain Selected Text",
    description: "Break down complex jargon, code logic, or technical sentences into plain English.",
    icon: <HelpCircle className="w-4 h-4 text-amber-500" />,
    actionName: "Explain Selection",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "action-items",
    title: "Extract Action Items",
    description: "Transform web page content into a clean checklist of deliverables and next steps.",
    icon: <ListTodo className="w-4 h-4 text-emerald-500" />,
    actionName: "Extract Tasks",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "grammar-polish",
    title: "Grammar & Tone Polish",
    description: "Elevate tone, eliminate typos, and enhance conciseness for emails or posts.",
    icon: <CheckCircle className="w-4 h-4 text-purple-500" />,
    actionName: "Polish Text",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "translate-page",
    title: "Smart Polyglot Translation",
    description: "Translate selected paragraphs or page context with natural idiomatic accuracy.",
    icon: <Languages className="w-4 h-4 text-cyan-500" />,
    actionName: "Translate",
    color: "from-cyan-500 to-blue-600",
  },
];

interface QuickActionsHubProps {
  onExecuteAction: (actionTitle: string, generatedResult: string) => void;
}

export const QuickActionsHub: React.FC<QuickActionsHubProps> = ({
  onExecuteAction,
}) => {
  const [runningActionId, setRunningActionId] = useState<string | null>(null);
  const [activeResult, setActiveResult] = useState<{ title: string; content: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleRunAction = (action: QuickActionItem) => {
    setRunningActionId(action.id);
    setActiveResult(null);

    setTimeout(() => {
      let result = "";
      if (action.id === "summarize-page") {
        result = `### 📄 1-Click Page Summary (github.com/appifydevs/assignment)

- 💡 **Core Thesis**: Official frontend internship evaluation repository detailing requirements for EchoGPT web app, landing page, and Chrome Side Panel.
- 📌 **Key Points**:
  - Requires Next.js, TypeScript, Tailwind CSS, and Framer Motion.
  - Evaluation criteria: frontend architecture, clean code, responsive ergonomics, WCAG accessibility, and creative micro-interactions.
  - Chrome Extension concept with bottom tab navigation, auto-resizing prompt input, and side-by-side comparison.
- ⏱️ **Read time saved**: 12 mins.`;
      } else if (action.id === "explain-selection") {
        result = `### 💡 Jargon & Concept Explanation

**Concept**: *Chrome Side Panel API & Manifest V3*

- **What it is**: A modern browser API introduced by Chrome that allows persistent, tab-synchronized sidebars alongside web content.
- **Why it matters**: Eliminates tab-switching friction and allows contextual AI prompts directly grounded in the active DOM.`;
      } else if (action.id === "action-items") {
        result = `### 📋 Extracted Action Items

- [x] Scaffold Next.js 14+ App Router project with TypeScript & Tailwind CSS
- [x] Build multi-model chat engine with token streaming telemetry
- [x] Create Dual-Model Arena & Prompt Library
- [x] Build Chrome Extension Prototype with bottom tab navigation & side panel toggle
- [x] Implement WCAG 2.1 AA screen reader completion announcements
- [x] Validate responsive layout across mobile, tablet, and desktop`;
      } else {
        result = `### ✨ Polished Output

"EchoGPT brings multi-model AI workflows directly to your browser side panel, dramatically streamlining development and research tasks without disrupting your focus."`;
      }

      setRunningActionId(null);
      setActiveResult({ title: action.title, content: result });
      onExecuteAction(action.title, result);
    }, 900);
  };

  const handleCopy = async () => {
    if (!activeResult) return;
    await navigator.clipboard.writeText(activeResult.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-3.5 space-y-3 h-full overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Quick Actions Hub</span>
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            1-click automated workflows for the active web page
          </p>
        </div>
        <SampleDataBadge variant="subtle" text="Sample Actions" />
      </div>

      {/* Action Buttons List */}
      <div className="space-y-2">
        {ACTIONS.map((action) => {
          const isRunning = runningActionId === action.id;
          return (
            <div
              key={action.id}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 hover:border-indigo-400 dark:hover:border-indigo-500 transition group"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white dark:bg-slate-700 shadow-xs">
                    {action.icon}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {action.title}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  isLoading={isRunning}
                  onClick={() => handleRunAction(action)}
                  className="text-[11px] py-1 px-2.5 h-auto cursor-pointer"
                >
                  Run
                </Button>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pl-8">
                {action.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Result Display Box */}
      {activeResult && (
        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/60 shadow-md space-y-2 animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 text-xs">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">
              {activeResult.title}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
            {activeResult.content}
          </div>
        </div>
      )}
    </div>
  );
};

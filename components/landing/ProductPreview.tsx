"use client";

import React, { useState } from "react";
import { Tabs } from "@/components/common/Tabs";
import { MessageSquare, Swords, FileText, MousePointerClick, Check, Copy, Sparkles, Bot, Zap, Globe } from "lucide-react";
import { SAMPLE_MODELS } from "@/data/models";
import { cn } from "@/lib/utils";

export const ProductPreview: React.FC = () => {
  const [activePreviewTab, setActivePreviewTab] = useState("chat");
  const [previewModelId, setPreviewModelId] = useState("gpt-4o");

  const previewTabs = [
    { id: "chat", label: "Multi-AI Chat", shortLabel: "Chat", icon: <MessageSquare className="w-4 h-4 shrink-0" /> },
    { id: "arena", label: "Dual-Model Arena", shortLabel: "Arena", icon: <Swords className="w-4 h-4 shrink-0" /> },
    { id: "summarizer", label: "1-Click Web Summarizer", shortLabel: "Summarize", icon: <FileText className="w-4 h-4 shrink-0" /> },
    { id: "copilot", label: "In-Page Floating Copilot", shortLabel: "Copilot", icon: <MousePointerClick className="w-4 h-4 shrink-0" /> },
  ];

  const activeModel = SAMPLE_MODELS.find((m) => m.id === previewModelId) || SAMPLE_MODELS[0];

  return (
    <section className="py-12 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 overflow-hidden">
      <div className="text-center space-y-3 mb-8 sm:mb-10 max-w-full">
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          See EchoGPT in Action
        </h2>
        <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Test drive our live interactive product capabilities before launching the full app.
        </p>

        {/* Interactive Segmented Tabs with Responsive Scroll Containment */}
        <div className="pt-3 flex justify-center max-w-full">
          <Tabs
            tabs={previewTabs}
            activeTab={activePreviewTab}
            onChange={setActivePreviewTab}
            size="md"
          />
        </div>
      </div>

      {/* Interactive Mockup Frame */}
      <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden min-h-[420px] sm:min-h-[440px] flex flex-col max-w-full w-full min-w-0">
        {/* Frame Window Header */}
        <div className="px-3 py-2 sm:px-4 sm:py-3 bg-slate-100/90 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs gap-2 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 truncate min-w-0 flex-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 shrink-0" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
            <span className="ml-1 font-mono text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate min-w-0">
              preview.echogpt.live/{activePreviewTab}
            </span>
          </div>

          {activePreviewTab === "chat" && (
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-slate-400 text-[10px] sm:text-[11px] hidden xs:inline">Model:</span>
              <select
                value={previewModelId}
                onChange={(e) => setPreviewModelId(e.target.value)}
                aria-label="Select preview model"
                className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[10px] sm:text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none cursor-pointer"
              >
                {SAMPLE_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Tab 1: Multi-AI Chat Preview */}
        {activePreviewTab === "chat" && (
          <div className="p-3.5 sm:p-6 space-y-3.5 sm:space-y-4 flex-1 flex flex-col justify-between max-w-full overflow-hidden min-w-0">
            <div className="space-y-3 sm:space-y-4 min-w-0">
              {/* User Prompt */}
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs sm:text-sm text-slate-800 dark:text-slate-200 break-words">
                <strong>You:</strong> Refactor this TypeScript async function with error handling and proper generic types.
              </div>

              {/* Assistant Response */}
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 overflow-hidden min-w-0">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-700 gap-2 min-w-0">
                  <div className="flex items-center gap-2 truncate min-w-0 flex-1">
                    <div className={cn("w-5 h-5 rounded-md flex items-center justify-center text-white text-[10px] font-bold shrink-0 bg-gradient-to-br", activeModel.iconBg)}>
                      {activeModel.shortName.slice(0, 2)}
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white truncate text-xs sm:text-sm min-w-0">{activeModel.name}</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono text-indigo-500 shrink-0">{activeModel.tokensPerSec} t/s</span>
                </div>
                <p className="break-words">Here is the refactored, type-safe implementation:</p>
                <div className="rounded-xl bg-slate-900 text-slate-200 p-2.5 sm:p-3 overflow-x-auto max-w-full min-w-0">
                  <pre className="text-[10px] sm:text-xs font-mono">
{`export async function fetchData<T>(url: string): Promise<Result<T, Error>> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    const data = (await res.json()) as T;
    return { ok: true, value: data };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err : new Error(String(err)) };
  }
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="pt-2 text-center text-xs text-slate-400">
              💡 Tip: Open the <a href="/app" className="text-indigo-500 font-semibold underline">Web App</a> to send custom prompts and view full streaming telemetry.
            </div>
          </div>
        )}

        {/* Tab 2: Arena Preview */}
        {activePreviewTab === "arena" && (
          <div className="p-4 sm:p-6 space-y-4 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-xs text-emerald-600 dark:text-emerald-400">Model A: GPT-4o</span>
                  <span className="text-[10px] font-mono text-slate-400">115 t/s • 320ms</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Focuses on concise, mathematical precision and high-throughput logic execution.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-xs text-amber-600 dark:text-amber-400">Model B: Claude 3.5 Sonnet</span>
                  <span className="text-[10px] font-mono text-slate-400">92 t/s • 410ms</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Excels in nuanced architectural refactoring, comments, and deep type system logic.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Summarizer Preview */}
        {activePreviewTab === "summarizer" && (
          <div className="p-3.5 sm:p-6 space-y-4 flex-1 min-w-0">
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3 min-w-0">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 min-w-0">
                <Globe className="w-4 h-4 shrink-0" />
                <span className="truncate min-w-0">Active Page: &quot;Next.js 15 & React 19 Architecture Overview&quot;</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 break-words">
                <p>💡 <strong>Core Thesis:</strong> Next.js 15 introduces async Request APIs, React 19 Compiler support, and improved bundling performance.</p>
                <p>📌 <strong>Key Takeaways:</strong></p>
                <ul className="list-disc ml-5 space-y-0.5 text-slate-600 dark:text-slate-400">
                  <li>Automatic memoization eliminates excessive useMemo and useCallback boilerplate.</li>
                  <li>Server Actions now natively integrate with useActionState.</li>
                  <li>Turbopack is enabled by default with 5x faster Fast Refresh.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: In-Page Copilot Preview */}
        {activePreviewTab === "copilot" && (
          <div className="p-3.5 sm:p-6 space-y-4 flex-1 min-w-0">
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed break-words">
              When reviewing complex codebases, simply highlight any phrase like{" "}
              <span className="bg-indigo-500 text-white px-1.5 py-0.5 rounded font-medium shadow-xs inline-block">
                React Server Components vs Client Hydration
              </span>{" "}
              and the floating EchoGPT copilot will instantly explain the nuances right next to your cursor.
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

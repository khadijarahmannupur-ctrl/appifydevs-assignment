"use client";

import React from "react";
import { Check, X, Sparkles } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { SampleDataBadge } from "@/components/common/SampleDataBadge";

export const WhyChoose: React.FC = () => {
  const comparisonRows = [
    {
      feature: "Access to Multi-Frontier Models (GPT-4o, Claude 3.5, Gemini 1.5, DeepSeek)",
      echoGPT: true,
      chatGPT: "OpenAI Only",
      claude: "Anthropic Only",
      basicExt: "Single Model",
    },
    {
      feature: "Chrome Side Panel Native API Integration",
      echoGPT: true,
      chatGPT: false,
      claude: false,
      basicExt: "Limited Popup",
    },
    {
      feature: "Dual-Model Arena (Side-by-Side Live Comparison)",
      echoGPT: true,
      chatGPT: false,
      claude: false,
      basicExt: false,
    },
    {
      feature: "In-Page Floating Highlight Copilot",
      echoGPT: true,
      chatGPT: false,
      claude: false,
      basicExt: "Basic",
    },
    {
      feature: "Automatic Web Page Context & DOM Extraction",
      echoGPT: true,
      chatGPT: false,
      claude: false,
      basicExt: true,
    },
    {
      feature: "Custom Prompt Template Library & Job Applications",
      echoGPT: true,
      chatGPT: "Generic",
      claude: "Generic",
      basicExt: false,
    },
    {
      feature: "Total Monthly Cost for All Models",
      echoGPT: "$12 / mo (or Free)",
      chatGPT: "$20 / mo",
      claude: "$20 / mo",
      basicExt: "$15 / mo",
      isHighlight: true,
    },
  ];

  return (
    <section className="py-12 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 overflow-hidden w-full min-w-0">
      <div className="text-center space-y-3 mb-8 sm:mb-12 max-w-full min-w-0">
        <div className="flex flex-col items-center gap-1">
          <Badge variant="success">Unbeatable Value</Badge>
          <SampleDataBadge variant="subtle" text="Sample comparison matrix" />
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white break-words">
          Why Choose EchoGPT?
        </h2>
        <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto break-words">
          Compare EchoGPT against single-model subscriptions and see why thousands of developers and researchers made the switch.
        </p>
      </div>

      {/* Comparison Table with Contained Horizontal Scroll */}
      <div className="w-full overflow-x-auto no-scrollbar rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl max-w-full min-w-0">
        <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[540px]">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60">
              <th className="p-3.5 sm:p-5 font-semibold text-slate-900 dark:text-white w-2/5">
                Feature / Capability
              </th>
              <th className="p-3.5 sm:p-5 font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/40 text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>EchoGPT</span>
                </div>
              </th>
              <th className="p-3.5 sm:p-5 font-semibold text-slate-600 dark:text-slate-400 text-center">
                ChatGPT Plus
              </th>
              <th className="p-3.5 sm:p-5 font-semibold text-slate-600 dark:text-slate-400 text-center hidden md:table-cell">
                Claude Pro
              </th>
              <th className="p-3.5 sm:p-5 font-semibold text-slate-600 dark:text-slate-400 text-center hidden sm:table-cell">
                Other Extensions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {comparisonRows.map((row, idx) => (
              <tr
                key={idx}
                className={
                  row.isHighlight
                    ? "bg-indigo-50/30 dark:bg-indigo-950/20 font-semibold"
                    : "hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                }
              >
                <td className="p-3.5 sm:p-5 text-slate-800 dark:text-slate-200 font-medium">
                  {row.feature}
                </td>

                {/* EchoGPT Column */}
                <td className="p-3.5 sm:p-5 text-center bg-indigo-50/50 dark:bg-indigo-950/40">
                  {row.echoGPT === true ? (
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                    </div>
                  ) : (
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm">{row.echoGPT}</span>
                  )}
                </td>

                {/* ChatGPT Column */}
                <td className="p-3.5 sm:p-5 text-center text-slate-500 dark:text-slate-400">
                  {row.chatGPT === false ? (
                    <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                  ) : (
                    <span className="text-xs sm:text-sm">{row.chatGPT}</span>
                  )}
                </td>

                {/* Claude Column */}
                <td className="p-3.5 sm:p-5 text-center text-slate-500 dark:text-slate-400 hidden md:table-cell">
                  {row.claude === false ? (
                    <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                  ) : (
                    <span className="text-xs sm:text-sm">{row.claude}</span>
                  )}
                </td>

                {/* Basic Extensions Column */}
                <td className="p-3.5 sm:p-5 text-center text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                  {row.basicExt === false ? (
                    <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                  ) : row.basicExt === true ? (
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 mx-auto" />
                  ) : (
                    <span className="text-xs sm:text-sm">{row.basicExt}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

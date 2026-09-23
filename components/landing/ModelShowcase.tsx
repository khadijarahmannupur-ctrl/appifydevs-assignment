"use client";

import React from "react";
import { SAMPLE_MODELS } from "@/data/models";
import { Card } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { SampleDataBadge } from "@/components/common/SampleDataBadge";
import { Zap, Clock, Layers, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const ModelShowcase: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center space-y-3 mb-12">
        <div className="flex flex-col items-center gap-1.5">
          <Badge variant="purple">Frontier Model Intelligence</Badge>
          <SampleDataBadge variant="subtle" text="Sample benchmark telemetry" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Powered by Industry-Leading AI Models
        </h2>
        <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Never be locked into a single provider. Switch seamlessly based on the complexity, latency, and context required for your task.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SAMPLE_MODELS.map((model) => (
          <Card
            key={model.id}
            hoverEffect
            className="flex flex-col justify-between space-y-4 relative overflow-hidden group"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md bg-gradient-to-br",
                      model.iconBg
                    )}
                  >
                    {model.shortName.slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                      {model.name}
                    </h3>
                    <p className="text-xs text-slate-400">{model.providerName}</p>
                  </div>
                </div>

                {model.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    {model.badge}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {model.description}
              </p>

              {/* Benchmark Telemetry */}
              <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center mb-4">
                <div>
                  <span className="block text-[10px] text-slate-400">Context</span>
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200">{model.contextWindow}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400">Speed</span>
                  <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400 font-mono">{model.tokensPerSec} t/s</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400">Latency</span>
                  <span className="font-bold text-xs text-emerald-600 dark:text-emerald-400 font-mono">{model.latencyMs}ms</span>
                </div>
              </div>

              {/* Strengths */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Best For:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {model.strengths.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-right">
              <a
                href="/app"
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Try {model.shortName} in Web App</span>
                <span>→</span>
              </a>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

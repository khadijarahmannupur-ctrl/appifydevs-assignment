"use client";

import React from "react";
import { Sparkles, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface SampleDataBadgeProps {
  className?: string;
  variant?: "pill" | "subtle" | "banner";
  text?: string;
}

export const SampleDataBadge: React.FC<SampleDataBadgeProps> = ({
  className,
  variant = "pill",
  text = "Sample demo data",
}) => {
  if (variant === "banner") {
    return (
      <div
        className={cn(
          "w-full bg-indigo-500/10 dark:bg-indigo-500/15 border-b border-indigo-500/20 px-4 py-1.5 text-xs text-indigo-700 dark:text-indigo-300 flex items-center justify-center gap-2",
          className
        )}
      >
        <Info className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span>
          <strong>Prototype Notice:</strong> Models, latency stats, and user metrics displayed are realistic <strong>sample demo data</strong> prepared for the AppifyDevs evaluation.
        </span>
      </div>
    );
  }

  if (variant === "subtle") {
    return (
      <span
        title="Telemetry and benchmark metrics are sample mock data for prototype demonstration"
        className={cn(
          "inline-flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-help",
          className
        )}
      >
        <Sparkles className="w-3 h-3 text-indigo-400" aria-hidden="true" />
        <span>{text}</span>
      </span>
    );
  }

  return (
    <span
      title="Sample data for UI demonstration"
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/40",
        className
      )}
    >
      <Sparkles className="w-3 h-3" aria-hidden="true" />
      <span>{text}</span>
    </span>
  );
};

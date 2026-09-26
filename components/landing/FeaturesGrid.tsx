"use client";

import React from "react";
import { Card } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import {
  Sidebar,
  Swords,
  FileText,
  MousePointerClick,
  ShieldCheck,
  Keyboard,
  Sparkles,
  Zap,
} from "lucide-react";

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: <Sidebar className="w-6 h-6 text-indigo-500" />,
      title: "Persistent Chrome Side Panel",
      description: "Integrates natively into Chrome's Side Panel API. Research, code, and chat alongside your live browser tab without window clutter.",
      badge: "Browser Native",
    },
    {
      icon: <Swords className="w-6 h-6 text-amber-500" />,
      title: "Dual-Model Arena Mode",
      description: "Send one prompt to two models simultaneously (e.g. GPT-4o vs Claude 3.5 Sonnet) and compare response speed, logic, and code elegance in real time.",
      badge: "New Innovation",
    },
    {
      icon: <FileText className="w-6 h-6 text-emerald-500" />,
      title: "1-Click Context Summarizer",
      description: "Extract executive TL;DRs, action deliverables, and estimated reading time directly from complex technical articles and documentation.",
      badge: "10x Productivity",
    },
    {
      icon: <MousePointerClick className="w-6 h-6 text-purple-500" />,
      title: "In-Page Floating Copilot",
      description: "Highlight any sentence or code block on any website to summon an instant floating action bubble for instant explanation, translation, or refactoring.",
      badge: "Interactive",
    },
    {
      icon: <Keyboard className="w-6 h-6 text-cyan-500" />,
      title: "Universal Hotkeys & Command Palette",
      description: "Navigate with lightning speed using Ctrl+Shift+E, global Cmd+K command palette, and '/' quick prompt template insertion.",
      badge: "Power Users",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-rose-500" />,
      title: "Zero-Data Retention Privacy",
      description: "Your browsing context and chat histories are securely stored locally in your browser storage. No data is stored for AI model training.",
      badge: "Enterprise Grade",
    },
  ];

  return (
    <section className="py-12 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 w-full min-w-0 overflow-hidden">
      <div className="text-center space-y-3 mb-10 sm:mb-14 max-w-full min-w-0">
        <Badge variant="primary">Architected for Speed</Badge>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white break-words">
          Engineered for Maximum Workflow Velocity
        </h2>
        <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto break-words">
          Every micro-interaction is designed to reduce friction, keep your focus intact, and give you the best AI models instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, idx) => (
          <Card
            key={idx}
            hoverEffect
            className="p-6 space-y-3.5 relative overflow-hidden group"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 shadow-xs group-hover:scale-110 transition-transform duration-200">
                {feat.icon}
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {feat.badge}
              </span>
            </div>

            <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
              {feat.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {feat.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};

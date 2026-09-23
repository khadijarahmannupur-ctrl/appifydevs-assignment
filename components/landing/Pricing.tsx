"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { Card } from "@/components/common/Card";
import { SampleDataBadge } from "@/components/common/SampleDataBadge";
import { Check, Sparkles, ArrowRight, Zap, Shield, Users } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

export const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const handleConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const plans = [
    {
      name: "Starter Free",
      description: "Essential multi-model AI side panel for casual daily browsing and research.",
      priceMonthly: 0,
      priceAnnual: 0,
      badge: "Free Forever",
      highlight: false,
      features: [
        "Access to Llama 3.3 70B & DeepSeek V3",
        "Chrome Side Panel & Popup (~400x600)",
        "50 AI queries per day",
        "1-Click Web Page Summarizer",
        "Standard token speed (~80 t/s)",
      ],
      ctaText: "Get Started Free",
      ctaLink: "/app",
    },
    {
      name: "Pro Power-User",
      description: "Uncapped frontier intelligence for developers, researchers, and creators.",
      priceMonthly: 15,
      priceAnnual: 12,
      badge: "Most Popular",
      highlight: true,
      features: [
        "Unlimited GPT-4o, Claude 3.5 Sonnet & Gemini 1.5",
        "DeepSeek R1 Step-by-Step Reasoning",
        "Dual-Model Arena (Side-by-Side Comparison)",
        "In-Page Highlight Floating Copilot",
        "Unlimited Web Page Context Attachments",
        "20+ Curated Prompt Templates Library",
        "Priority token streaming throughput (140+ t/s)",
      ],
      ctaText: "Upgrade to Pro",
      ctaLink: "/app",
    },
    {
      name: "Team & Studio",
      description: "Collaborative AI workspace with centralized billing and custom security.",
      priceMonthly: 35,
      priceAnnual: 29,
      badge: "For Teams",
      highlight: false,
      features: [
        "Everything in Pro Power-User",
        "Shared Organization Prompt Libraries",
        "Bring-Your-Own API Keys (BYOK) support",
        "Admin user management & seat allocation",
        "Dedicated SOC-2 Compliant Private Cloud",
        "Priority 24/7 Slack & Email support",
      ],
      ctaText: "Contact Sales",
      ctaLink: "/app",
    },
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center space-y-3 mb-12">
        <div className="flex flex-col items-center gap-1.5">
          <Badge variant="primary">Simple, Transparent Pricing</Badge>
          <SampleDataBadge variant="subtle" text="Sample pricing tier structure" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          One Subscription. All AI Models.
        </h2>
        <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Save over $60/month compared to paying for separate ChatGPT, Claude, and Gemini subscriptions.
        </p>

        {/* Monthly / Annual Toggle Switch */}
        <div className="pt-4 flex items-center justify-center gap-3 select-none">
          <span
            className={cn(
              "text-xs font-semibold cursor-pointer",
              !isAnnual ? "text-slate-900 dark:text-white" : "text-slate-400"
            )}
            onClick={() => setIsAnnual(false)}
          >
            Monthly Billing
          </span>

          <button
            type="button"
            role="switch"
            aria-checked={isAnnual}
            aria-label="Toggle annual billing discount"
            onClick={() => setIsAnnual(!isAnnual)}
            className={cn(
              "relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
              isAnnual ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"
            )}
          >
            <span
              className={cn(
                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out",
                isAnnual ? "translate-x-6" : "translate-x-0"
              )}
            />
          </button>

          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "text-xs font-semibold cursor-pointer",
                isAnnual ? "text-slate-900 dark:text-white" : "text-slate-400"
              )}
              onClick={() => setIsAnnual(true)}
            >
              Annual Billing
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 animate-pulse">
              Save 20%
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan, idx) => {
          const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;
          return (
            <Card
              key={idx}
              hoverEffect
              glow={plan.highlight}
              className={cn(
                "flex flex-col justify-between p-6 sm:p-8 relative",
                plan.highlight
                  ? "border-indigo-500/80 dark:border-indigo-500/80 shadow-xl shadow-indigo-500/10"
                  : ""
              )}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[11px] font-bold shadow-md">
                  ⭐ Recommended
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {plan.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
                    ${price}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {price === 0 ? "forever" : "/ month"}
                  </span>
                </div>

                {/* Feature Checklist */}
                <div className="space-y-2.5 mb-8">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Included Features:
                  </span>
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Link href={plan.ctaLink} onClick={handleConfetti}>
                <Button
                  size="md"
                  variant={plan.highlight ? "primary" : "outline"}
                  className="w-full"
                >
                  {plan.ctaText}
                </Button>
              </Link>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

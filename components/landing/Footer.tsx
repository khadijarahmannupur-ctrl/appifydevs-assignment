"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/common/Button";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { SampleDataBadge } from "@/components/common/SampleDataBadge";
import { ChromeIcon, GithubIcon, TwitterIcon, LinkedinIcon } from "@/components/common/BrandIcons";
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import confetti from "canvas-confetti";

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubmitted(true);
    setNewsletterEmail("");
  };

  const handleConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.8 },
    });
  };

  return (
    <footer className="pt-12 sm:pt-16 pb-12 bg-white dark:bg-[#070A11] border-t border-slate-200 dark:border-slate-800/80 overflow-hidden w-full max-w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16 w-full min-w-0">
        {/* Final Conversion CTA Banner */}
        <div className="relative rounded-3xl p-6 sm:p-12 overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 text-white shadow-2xl max-w-full min-w-0">
          <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none max-w-full" />
          <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none max-w-full" />

          <div className="relative z-10 max-w-3xl space-y-4 text-center sm:text-left min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-indigo-200">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Experience Next-Gen Productivity</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight break-words">
              Ready to supercharge your workflow with EchoGPT?
            </h2>

            <p className="text-xs sm:text-base text-indigo-100 max-w-xl leading-relaxed break-words">
              Launch the full web workspace or install the Chrome Extension to experience effortless multi-model AI.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link href="/app" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-indigo-900 hover:bg-slate-100 shadow-xl font-bold"
                >
                  <span>Launch Web App</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <Link href="/extension" className="w-full sm:w-auto" onClick={handleConfetti}>
                <Button
                  size="lg"
                  variant="glass"
                  className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10"
                >
                  <ChromeIcon className="w-4 h-4 mr-2 text-cyan-300" />
                  <span>Try Extension Concept</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-6">
          {/* Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-base text-slate-900 dark:text-white">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-400 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <span>EchoGPT</span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Unified multi-model AI productivity suite engineered for developers, researchers, and creators by AppifyDevs.
            </p>
            <div className="pt-1">
              <SampleDataBadge variant="subtle" text="Internship Evaluation Task" />
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Product
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/app" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Web App Redesign
                </Link>
              </li>
              <li>
                <Link href="/extension" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Chrome Extension Simulator
                </Link>
              </li>
              <li>
                <Link href="/app" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Dual-Model Arena
                </Link>
              </li>
              <li>
                <a href="#pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Pricing Plans
                </a>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Company & Docs
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <a
                  href="https://echogpt.live/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  Original EchoGPT (Live) ↗
                </a>
              </li>
              <li>
                <a
                  href="https://chromewebstore.google.com/detail/echogpt-multi-ai-chat-sid/negimdcamohmoheiifgecbjgjepkcfhj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  Official Chrome Web Store ↗
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Privacy & Zero-Retention
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Stay Updated
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Subscribe for new frontier model integrations and productivity tips.
            </p>
            {newsletterSubmitted ? (
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-medium">
                <CheckCircle className="w-4 h-4" />
                <span>Subscribed! Thank you.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-1.5">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="name@work.com"
                  required
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 border border-slate-200 dark:border-slate-700 outline-none w-full"
                />
                <Button size="sm" type="submit">
                  Join
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Operational Status Bar */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>All AI Systems Operational (99.99% uptime)</span>
          </div>

          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} EchoGPT by AppifyDevs. Candidate Submission.</span>
            <ThemeToggle size="sm" />
          </div>
        </div>
      </div>
    </footer>
  );
};

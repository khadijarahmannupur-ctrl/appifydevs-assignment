"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/common/Button";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { ChromeIcon } from "@/components/common/BrandIcons";
import {
  Sparkles,
  Command,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "AI Models", href: "#models" },
    { label: "Preview", href: "#preview" },
    { label: "Why EchoGPT", href: "#why" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg text-slate-900 dark:text-white">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="w-4.5 h-4.5" />
          </div>
          <span className="tracking-tight">EchoGPT</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Tools & Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Command Palette Button */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
            title="Command Palette (Cmd+K)"
          >
            <Command className="w-3.5 h-3.5" />
            <kbd className="font-mono text-[10px]">⌘K</kbd>
          </button>

          {/* Theme Switcher */}
          <ThemeToggle size="sm" />

          {/* Extension Concept Link */}
          <Link href="/extension" className="hidden sm:inline-block">
            <Button size="sm" variant="ghost" className="text-xs">
              <ChromeIcon className="w-3.5 h-3.5 mr-1 text-indigo-500" />
              <span>Extension</span>
            </Button>
          </Link>

          {/* Launch Web App Button */}
          <Link href="/app">
            <Button size="sm" className="text-xs font-bold">
              <span>Launch App</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <Link href="/extension" onClick={() => setMobileMenuOpen(false)}>
              <Button size="sm" variant="outline" className="w-full justify-center">
                <ChromeIcon className="w-4 h-4 mr-1.5 text-indigo-500" />
                <span>Chrome Extension Prototype</span>
              </Button>
            </Link>
            <Link href="/app" onClick={() => setMobileMenuOpen(false)}>
              <Button size="sm" className="w-full justify-center font-bold">
                <span>Launch Web App Redesign →</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

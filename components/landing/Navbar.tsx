"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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

interface NavLinkItem {
  id: string;
  label: string;
  href: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const navLinks: NavLinkItem[] = [
    { id: "preview", label: "Preview", href: "#preview" },
    { id: "models", label: "AI Models", href: "#models" },
    { id: "features", label: "Features", href: "#features" },
    { id: "why", label: "Why EchoGPT", href: "#why" },
    { id: "pricing", label: "Pricing", href: "#pricing" },
    { id: "faq", label: "FAQ", href: "#faq" },
  ];

  // Scroll-spy to track current active section on the page
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160; // offset for sticky navbar + breathing room

      // If at the very top (hero area), clear active section
      if (window.scrollY < 120) {
        setActiveSection("");
        return;
      }

      let current = "";
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            current = link.id;
            break;
          }
        }
      }

      // If between sections or at the bottom, find the closest section above
      if (!current) {
        for (let i = navLinks.length - 1; i >= 0; i--) {
          const el = document.getElementById(navLinks[i].id);
          if (el && scrollPosition >= el.offsetTop) {
            current = navLinks[i].id;
            break;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const navHeight = 70;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(targetId);
    }
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      aria-label="Main Navigation"
      className="sticky top-0 z-40 bg-white/85 dark:bg-[#0B0F19]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 transition-colors w-full max-w-full"
    >
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4 w-full min-w-0">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-base sm:text-lg text-slate-900 dark:text-white group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 rounded-xl px-1 py-1 shrink-0"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="tracking-tight">EchoGPT</span>
        </Link>

        {/* Desktop Navigation Links with Animated Active Indicator & Hover Pill */}
        <div
          className="hidden md:flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-md"
          onMouseLeave={() => setHoveredSection(null)}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            const isHovered = hoveredSection === link.id;

            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.id)}
                onMouseEnter={() => setHoveredSection(link.id)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative px-3.5 py-1.5 text-xs font-medium rounded-xl transition-colors duration-150 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900",
                  isActive
                    ? "text-indigo-600 dark:text-indigo-300 font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                {/* Active Indicator (Pill Background + Bottom Glow Bar) */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-xs border border-indigo-200/80 dark:border-indigo-800/80 -z-10"
                  >
                    <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 rounded-full" />
                  </motion.div>
                )}

                {/* Hover Pill (when not active) */}
                {!isActive && isHovered && (
                  <motion.div
                    layoutId="navbar-hover-pill"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    className="absolute inset-0 bg-slate-200/60 dark:bg-slate-800/50 rounded-xl -z-10"
                  />
                )}

                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* Right Tools & Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Command Palette Button */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 transition cursor-pointer"
            title="Command Palette (Cmd+K)"
          >
            <Command className="w-3.5 h-3.5" />
            <kbd className="font-mono text-[10px]">⌘K</kbd>
          </button>

          {/* Theme Switcher */}
          <ThemeToggle size="sm" />

          {/* Extension Concept Link */}
          <Link href="/extension" className="hidden sm:inline-block">
            <Button
              size="sm"
              variant="ghost"
              className="text-xs focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <ChromeIcon className="w-3.5 h-3.5 mr-1 text-indigo-500" />
              <span>Extension</span>
            </Button>
          </Link>

          {/* Launch Web App Button (Adaptive compact text on mobile) */}
          <Link href="/app">
            <Button
              size="sm"
              className="text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <span className="hidden sm:inline">Launch App</span>
              <span className="sm:hidden">App</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 shrink-0" />
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white md:hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-4 py-4 space-y-3 overflow-hidden"
          >
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                      isActive
                        ? "bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-300 font-bold border-l-4 border-indigo-600"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    )}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                    )}
                  </a>
                );
              })}
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

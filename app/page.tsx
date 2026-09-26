"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ProductPreview } from "@/components/landing/ProductPreview";
import { ModelShowcase } from "@/components/landing/ModelShowcase";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { WhyChoose } from "@/components/landing/WhyChoose";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { CommandPalette } from "@/components/common/CommandPalette";
import { KeyboardShortcutModal } from "@/components/common/KeyboardShortcutModal";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";

export default function LandingPage() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  // Global hotkeys
  useKeyboardShortcut("k", () => setIsCommandPaletteOpen((prev) => !prev), {
    ctrlOrCmd: true,
  });
  useKeyboardShortcut("?", () => setIsShortcutsOpen((prev) => !prev));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white w-full max-w-full overflow-x-hidden">
      {/* Top Navigation */}
      <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 w-full max-w-full min-w-0">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Interactive Product Preview */}
        <div id="preview">
          <ProductPreview />
        </div>

        {/* 3. AI Models Showcase */}
        <div id="models">
          <ModelShowcase />
        </div>

        {/* 4. Features Grid */}
        <div id="features">
          <FeaturesGrid />
        </div>

        {/* 5. Why Choose EchoGPT */}
        <div id="why">
          <WhyChoose />
        </div>

        {/* 6. Pricing Section */}
        <div id="pricing">
          <Pricing />
        </div>

        {/* 7. Testimonials & Social Proof */}
        <Testimonials />

        {/* 8. Searchable FAQ Accordion */}
        <div id="faq">
          <FAQ />
        </div>
      </main>

      {/* Global Footer & Conversion CTA */}
      <Footer />

      {/* Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* Keyboard Shortcuts Cheat Sheet */}
      <KeyboardShortcutModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}

# EchoGPT - Multi-AI Chat, Chrome Side Panel & Productivity Suite

> **Senior Frontend Internship Test Task for AppifyDevs**  
> Built with **Next.js 16 (App Router & Turbopack)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## 🌟 Executive Summary & Project Overview

**EchoGPT** is an all-in-one AI productivity platform that unifies frontier Large Language Models (**GPT-4o**, **Claude 3.5 Sonnet**, **Gemini 1.5 Pro**, **DeepSeek R1**, and **Llama 3.3 70B**) into a single workspace and persistent **Google Chrome Side Panel**.

This project delivers:
1. **Redesigned Web Application (`/app`)**: An ultra-responsive AI chat workspace featuring multi-model hot-switching, realistic token streaming with live telemetry (tokens/s and latency), a **Dual-Model Compare Arena**, a categorized library of 20+ prompt templates, a global `⌘K` command palette, code snippet export, and WCAG 2.1 AA screen reader accessibility.
2. **Single-Page Product Landing Page (`/`)**: A high-converting showcase featuring an interactive live product preview, model latency matrix, comparative value matrix, annual/monthly pricing calculator with celebratory confetti, filterable user testimonials, and a searchable FAQ accordion.
3. **Interactive Chrome Extension Concept (`/extension`)**: A simulated browser environment showcasing Chrome's native **Side Panel API** (420px docked view) and a companion **Popup Frame (~400×600)** with bottom tab navigation (Chat, History, Actions, Settings), 1-click page summarization, auto-resizing textarea with `/` template triggers, and an innovative **In-Page Highlight Floating Copilot**.

---

## 🔍 Step 1: Research & Problem Analysis

Before writing code, we conducted an in-depth UX, UI, speed, mobile, and accessibility audit of both:
- **Live Web App**: [https://echogpt.live/](https://echogpt.live/)
- **Chrome Web Store Extension**: [EchoGPT Chrome Extension](https://chromewebstore.google.com/detail/echogpt-multi-ai-chat-sid/negimdcamohmoheiifgecbjgjepkcfhj)

### What Was Good in the Original Product:
- Strong core premise: Bringing multiple LLMs and job application tools to one place.
- Chrome Side Panel integration: Allows research alongside active web content using Chrome's native Side Panel API (`Ctrl+Shift+E`).

### Identified Problems & Our Engineering Solutions:
| Dimension | Original Limitation | EchoGPT Redesign Solution |
|---|---|---|
| **UI & Visual Design** | Generic template appearance, lack of visual hierarchy and micro-interactions. | Bespoke design system with tailored dark/light themes, glowing ambient gradients, glassmorphic panels, and crisp typography (`Plus Jakarta Sans` + `JetBrains Mono`). |
| **Chat UX & Feedback** | Static response presentation without telemetry, code management, or model comparison. | Realistic character streaming simulation, tokens/sec & latency meters, syntax-highlighted code blocks with 1-click copy/download, and **Dual-Model Arena** mode. |
| **Extension Usability** | Basic popup navigation, limited quick actions, no search in extension history. | 4-Tab bottom navigation (`Chat`, `History`, `Actions`, `Settings`), searchable/pinnable history, 1-click page summarizer, and **In-Page Floating Highlight Copilot**. |
| **Accessibility (WCAG)** | Missing visible focus rings, low contrast elements, screen readers flooded per character during streaming. | WCAG 2.1 AA compliant: full keyboard navigation (`Tab`, `Esc`, `Cmd+K`), visible focus rings, high contrast ratios, and `aria-live="polite"` announcements triggered **only when streaming finishes**. |
| **Performance & Responsive** | Slow font loads, layout shifts on mobile viewports. | `next/font/google` zero layout shift, responsive mobile drawer navigation, fluid typography, and dynamic imports. |

---

## 🚀 Getting Started & Setup Guide

### Prerequisites
- **Node.js**: v18.17+ or v20+ (tested on Node v24.15.0)
- **npm**: v9+ or v11+

### Installation Steps
```bash
# 1. Clone the repository
git clone https://github.com/your-username/appifydevs-assignment.git
cd appifydevs-assignment

# 2. Install dependencies
npm install

# 3. Start the Next.js development server (Turbopack)
npm run dev

# 4. Open in browser
# Landing Page:    http://localhost:3000/
# Web App:         http://localhost:3000/app
# Chrome Extension:http://localhost:3000/extension
```

### Production Build & Verification
```bash
# Build the production bundle
npm run build

# Start the production server
npm start

# Run ESLint validation
npm run lint
```

---

## 🛠️ Technologies Used & Architecture

- **Core Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict typing with interfaces for models, messages, prompts, and settings)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@custom-variant dark` and custom glassmorphism tokens
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Spring physics, layout animations, and `prefers-reduced-motion` compliance)
- **Typography**: `next/font/google` (`Plus_Jakarta_Sans` for UI and `JetBrains_Mono` for code blocks)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG Brand Icons
- **State & Persistence**: Custom React Hooks (`useChat`, `useLocalStorage`, `useAutoResizeTextarea`, `useKeyboardShortcut`)
- **Interactive Confetti**: `canvas-confetti` for celebratory conversion milestones
- **Accessibility**: WCAG 2.1 AA compliant landmarks, ARIA live announcements, focus rings, and skip-link

---

## 📁 Clean Folder Structure

```
├── app/
│   ├── layout.tsx              # Root layout with ThemeProvider, next/font, metadata, skip-link
│   ├── page.tsx                # Single-page Landing Page (Hero, Features, Pricing, etc.)
│   ├── globals.css             # Tailwind base, dark mode variant, glassmorphic utilities
│   ├── app/
│   │   └── page.tsx            # Redesigned EchoGPT Web App (Chat, Arena, History, Templates)
│   └── extension/
│       └── page.tsx            # Chrome Extension Interactive Concept (Popup ~400x600 & Side Panel)
├── components/
│   ├── common/                 # Reusable UI primitives: Button, Badge, Card, Modal, Tabs, Switch, ThemeToggle, BrandIcons, CommandPalette
│   ├── landing/                # Hero, Navbar, ProductPreview, ModelShowcase, FeaturesGrid, WhyChoose, Pricing, Testimonials, FAQ, Footer
│   ├── webapp/                 # ChatArea, MessageItem, CodeBlock, ModelSelector, PromptLibraryModal, ChatSidebar, ArenaView
│   └── extension/              # BrowserMockup, ExtensionPopup, QuickActionsHub, ExtensionHistory, ExtensionSettings, InPageCopilot
├── hooks/
│   ├── useLocalStorage.ts      # Hydration-safe reactive localStorage persistence hook
│   ├── useChat.ts              # Multi-turn conversation engine with streaming telemetry & WCAG live regions
│   ├── useAutoResizeTextarea.ts# Auto-growing prompt textarea
│   └── useKeyboardShortcut.ts  # Universal cross-platform shortcut handler (Cmd+K, Ctrl+Shift+E, Esc, ?)
├── types/
│   └── index.ts                # Strict TypeScript interfaces (AIModel, ChatMessage, Conversation, PromptTemplate, etc.)
├── data/
│   ├── models.ts               # Frontier model specifications & sample latency benchmarks
│   ├── prompts.ts              # 20+ categorized prompt templates
│   ├── faqs.ts                 # Categorized FAQ dataset with search support
│   └── testimonials.ts         # Verified sample user testimonials
└── README.md                   # Complete architectural and setup documentation
```

---

## 💡 Assumptions & Sample Data Disclosure

1. **Sample Data Notice**: All AI models (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, DeepSeek R1, Llama 3.3), latency benchmarks (ms), token generation speeds (tokens/s), pricing tiers, active user statistics (50,000+), and user testimonials are realistic **sample demo data** constructed for evaluating frontend architecture and UX polish.
2. **Chrome Extension Architecture**: The actual Chrome extension runs inside Chrome's native **Side Panel API** (`chrome.sidePanel`). Our prototype faithfully replicates both the persistent **Side Panel view (420px)** and a companion **Popup frame (~400×600)** within an interactive browser viewport.
3. **Local Storage**: Conversations, pinned chats, custom prompt preferences, and settings persist safely in client-side `localStorage`.

---

## ✨ Extra Features & Creative Innovations

1. **Dual-Model Arena Mode**: Simultaneously send a single prompt to two frontier models (e.g. GPT-4o vs Claude 3.5 Sonnet) and compare response speed, logic depth, and code structure side-by-side with voting.
2. **In-Page Floating Highlight Copilot**: Select any text on a simulated webpage to summon a floating micro-action bubble for instant explanation, TL;DR extraction, or translation.
3. **Universal Command Palette (`⌘K` / `Ctrl+K`)**: Universal fuzzy search across pages, models, prompt templates, and quick actions.
4. **Keyboard Shortcut Modal (`?`)**: Full cheat sheet of productivity hotkeys (`Ctrl+Shift+E`, `Cmd+K`, `/`, `Enter`, `Shift+Enter`, `Esc`).
5. **Auto-Growing Prompt Textarea**: Automatically resizes up to 180px with `/` shortcut trigger for the prompt template library.
6. **Screen Reader Accessible Streaming**: Rather than firing ARIA live events on every streamed character token, EchoGPT announces to assistive technologies **only when the response generation finishes**.
7. **1-Click Markdown Chat Export**: Export all conversation history into structured Markdown files for archiving and documentation.

---

## 📋 Comprehensive Requirements Checklist

### 1. Research & Redesign Core Requirements
- [x] Researched live web app (`https://echogpt.live/`) and Chrome Extension (`negimdcamohmoheiifgecbjgjepkcfhj`).
- [x] Documented good/bad points across UI, UX, speed, mobile, and accessibility.
- [x] Built modern, high-aesthetic web app redesign (`/app`) with multi-model switcher, chat history, prompt templates, and keyboard shortcuts.
- [x] Built single-page landing page (`/`) with Hero, Features, AI Models, Interactive Product Preview, Why Choose EchoGPT, Pricing, FAQ, Testimonials, CTA, and Footer.
- [x] Built Chrome Extension concept at `/extension` with popup frame (~400×600), Chrome Side Panel view (420px), bottom tab navigation (`Chat`, `History`, `Actions`, `Settings`), prompt input, AI model selection, quick actions, and settings.
- [x] Added innovative ideas: **Dual-Model Arena** and **In-Page Floating Highlight Copilot**.

### 2. User-Requested Refinements
- [x] **Extension Bottom Tab Navigation**: Added bottom tabs (`Chat`, `History`, `Actions`, `Settings`).
- [x] **Extension History Tab**: Search, pin, and delete conversation history inside the popup.
- [x] **Extension Prompt Input**: Auto-growing textarea, `Enter` to send, `Shift+Enter` for newline, `/` for prompt templates, and voice input button simulation.
- [x] **Performance Optimizations**: Configured `next/font/google` (`Plus Jakarta Sans` & `JetBrains Mono`), `next/image` avatar optimization, and code-split modular components.
- [x] **Responsive Testing**: Fully responsive on mobile (375px), tablet (768px), and desktop (1280px+). `/extension` adapts cleanly on mobile screens.
- [x] **Sample Data Transparency**: Explicitly labeled sample data in the UI and documented in README Assumptions.
- [x] **Side Panel Recognition**: Accurately modeled Chrome's Side Panel API architecture.
- [x] **State Persistence & Hooks**: Implemented `localStorage` persistence with a dedicated `hooks/` directory (`useLocalStorage`, `useChat`, `useAutoResizeTextarea`, `useKeyboardShortcut`).
- [x] **WCAG Screen Reader Support**: Configured `aria-live="polite"` announcements triggered only upon generation completion.

### 3. Bonus Requirements
- [x] **Dark / Light Mode**: Smooth transition with system detection + manual switch with persistence.
- [x] **Framer Motion Animations**: Micro-interactions, spring transitions, and tab indicator animations.
- [x] **Accessibility**: WCAG 2.1 AA compliant (keyboard focus rings, landmarks, high contrast, ARIA tags).
- [x] **Strict TypeScript**: 100% typed interfaces, zero compilation warnings.
- [x] **Reusable UI Component Library**: Button, Badge, Card, Modal, Tabs, Switch, ThemeToggle, SampleDataBadge, CommandPalette.

---

## 👨‍💻 Candidate Submission Notes

This test task was created with deep attention to detail, modern frontend architecture, and user delight for **AppifyDevs**. The codebase is production-ready, clean, and prepared for instant deployment on **Vercel** and **GitHub**.

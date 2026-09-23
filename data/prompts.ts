import { PromptTemplate } from "@/types";

export const SAMPLE_PROMPT_TEMPLATES: PromptTemplate[] = [
  // 💻 Coding & Debugging
  {
    id: "code-review",
    title: "Senior Code Review",
    description: "Analyze code for performance bottlenecks, edge cases, accessibility, and type safety.",
    category: "Coding",
    modelSuggestion: "claude-3-5-sonnet",
    prompt: `Please review the following code as a Senior Staff Engineer.
Evaluate:
1. Performance & computational complexity (Big-O)
2. Edge cases and unexpected failure modes
3. Type safety & modularity
4. Accessibility / WCAG compliance (if frontend)
5. Provide the refactored solution with clear inline comments.

Code snippet:
\`\`\`typescript
// Paste your code here
\`\`\``
  },
  {
    id: "tailwind-refactor",
    title: "Tailwind CSS Clean Architecture",
    description: "Refactor messy inline CSS/classes into elegant, responsive, dark-mode ready Tailwind styles.",
    category: "Coding",
    modelSuggestion: "gpt-4o",
    prompt: `Refactor the following component into clean, maintainable Tailwind CSS classes.
Requirements:
- Responsive for mobile, tablet, and desktop (sm:, md:, lg:)
- Full dark mode support (dark: variants)
- Interactive hover, focus-visible, and active states
- Smooth micro-transitions (transition-all duration-200)

Component to refactor:`
  },
  {
    id: "unit-test-generator",
    title: "Unit & Integration Test Suite",
    description: "Generate comprehensive Vitest / Jest test cases covering happy paths and edge cases.",
    category: "Coding",
    modelSuggestion: "claude-3-5-sonnet",
    prompt: `Write a robust unit test suite for the provided function or React hook using Vitest and React Testing Library.
Include:
- Positive / Happy path scenarios
- Boundary condition tests
- Asynchronous error handling and rejection states
- Mocking external dependencies`
  },
  {
    id: "api-doc-generator",
    title: "REST / GraphQL API Documentation",
    description: "Transform raw backend endpoint logic into clean OpenAPI / Markdown documentation.",
    category: "Coding",
    modelSuggestion: "gpt-4o",
    prompt: `Generate clean, human-readable API documentation with request/response schemas, parameter tables, error codes, and curl examples for the following endpoint:`
  },

  // 📄 Job Search & Career (EchoGPT Speciality)
  {
    id: "tailored-cover-letter",
    title: "Targeted Internship / Job Cover Letter",
    description: "Craft a compelling, non-generic cover letter tailored to a specific job description and company.",
    category: "Job Search",
    modelSuggestion: "claude-3-5-sonnet",
    prompt: `You are an expert career strategist. Write a captivating, authentic cover letter for a Frontend Internship application at AppifyDevs.

My background:
- Passionate frontend developer skilled in Next.js, React, TypeScript, Tailwind CSS, and Framer Motion
- Deep focus on UI/UX polish, micro-interactions, responsive ergonomics, and WCAG accessibility
- Experience building full redesign prototypes and Chrome extensions

Company & Role:
- AppifyDevs (Innovative product studio building EchoGPT, AI productivity tools, and mobile apps)

Tone: High-energy, confident, technically articulate, and authentic.`
  },
  {
    id: "resume-bullet-polish",
    title: "High-Impact Resume Bullet Points (XYZ Formula)",
    description: "Rewrite resume achievements using Google's XYZ formula: Accomplished [X] as measured by [Y], by doing [Z].",
    category: "Job Search",
    modelSuggestion: "gpt-4o",
    prompt: `Rewrite my raw bullet points using Google's XYZ formula (Accomplished [X] as measured by [Y], by doing [Z]).
Make them quantifiable, action-oriented, and tailored for senior software engineering roles.

Raw notes:
`
  },
  {
    id: "tech-interview-prep",
    title: "Frontend Technical Interview Simulator",
    description: "Conduct an interactive mock interview on React 19, DOM rendering, Next.js App Router, and CSS architecture.",
    category: "Job Search",
    modelSuggestion: "claude-3-5-sonnet",
    prompt: `Act as a Staff Frontend Engineer interviewer at a top tech company. Ask me 1 challenging question at a time about:
- Next.js 14/15 App Router vs Pages Router architecture
- React concurrency, Server Components vs Client Components
- Browser critical rendering path & performance optimization
- Accessible interactive component design (WCAG 2.1 AA)

Wait for my answer before providing detailed feedback and the next question.`
  },

  // ✍️ Writing & Content
  {
    id: "tldr-summarizer",
    title: "1-Click Executive TL;DR",
    description: "Extract the core value, key takeaways, and action items in under 30 seconds of reading time.",
    category: "Writing",
    modelSuggestion: "llama-3-3-70b",
    prompt: `Provide a punchy Executive Summary of the following text:
1. 💡 **Core Thesis** (1 sentence)
2. 📌 **Top 3-5 Key Takeaways** (Bullet points with bold highlights)
3. ⚡ **Action Items / Next Steps**
4. ⏱️ **Estimated Original Read Time** vs **Time Saved**

Text to summarize:
`
  },
  {
    id: "engaging-release-notes",
    title: "Product Release Notes & Changelog",
    description: "Turn technical Git commit logs into engaging, user-friendly product update announcements.",
    category: "Writing",
    modelSuggestion: "gpt-4o",
    prompt: `Write engaging, developer-friendly release notes for our latest product release.
Structure into:
- 🚀 Highlights & New Capabilities
- 🛠️ Improvements & Performance Polish
- 🐛 Bug Fixes
- 📖 What's Next`
  },

  // 📊 Analysis & Productivity
  {
    id: "dual-model-prompt-eval",
    title: "Multi-Model Comparative Prompt",
    description: "A prompt specifically designed to test nuance, reasoning depth, and creative logic across models.",
    category: "Analysis",
    modelSuggestion: "deepseek-r1",
    prompt: `Analyze the architectural tradeoffs between Client-Side Rendering (CSR), Server-Side Rendering (SSR), and React Server Components (RSC) for a real-time collaborative AI workspace.
Include:
- Latency & First Contentful Paint (FCP) tradeoffs
- Memory overhead on client vs server
- Developer experience & caching complexity
- Concrete recommendation for a browser extension sidebar`
  },
  {
    id: "math-algorithmic-reasoning",
    title: "Step-by-Step Chain of Thought Algorithm",
    description: "Deconstruct complex algorithmic problems with step-by-step mathematical reasoning.",
    category: "Analysis",
    modelSuggestion: "deepseek-r1",
    prompt: `Solve the following computational problem step-by-step using formal chain-of-thought verification:
1. State the formal problem definition and invariants
2. Outline brute force vs optimal approach
3. Prove time and space complexity with Big-O
4. Write optimal TypeScript implementation`
  },
  {
    id: "meeting-action-extractor",
    title: "Meeting Notes to Action Items & OKRs",
    description: "Parse unstructured meeting transcripts into prioritized tasks with owners, deadlines, and dependencies.",
    category: "Productivity",
    modelSuggestion: "llama-3-3-70b",
    prompt: `Convert the following meeting transcript into a structured action matrix:
- **Decision Log**: Key choices made during the discussion
- **Task Table**: Action Item | Owner | Priority (P0/P1/P2) | Next Step
- **Open Questions**: Blockers needing follow-up`
  }
];

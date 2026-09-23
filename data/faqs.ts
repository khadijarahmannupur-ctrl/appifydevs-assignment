import { FAQItem } from "@/types";

export const SAMPLE_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    category: "General",
    question: "What is EchoGPT and how does it differ from standard ChatGPT?",
    answer: "EchoGPT unites multiple leading AI models (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, DeepSeek R1, Llama 3.3) into one unified interface and browser side panel. Instead of paying for 4 separate subscriptions or switching tabs, you can chat with, compare, and query any model with your active webpage context."
  },
  {
    id: "faq-2",
    category: "Extension",
    question: "How does the Chrome Extension Side Panel work?",
    answer: "The EchoGPT extension integrates natively with Google Chrome's Side Panel API (accessible via the toolbar or shortcut Ctrl+Shift+E / Cmd+Shift+E). It remains pinned alongside any webpage you browse, allowing you to summarize articles, explain code snippets, and draft emails without losing your place."
  },
  {
    id: "faq-3",
    category: "Extension",
    question: "What is the In-Page Floating Copilot?",
    answer: "Whenever you highlight text on any webpage, a discrete EchoGPT action bubble appears next to your cursor. With one click, you can ask AI to explain difficult jargon, translate languages, simplify technical documentation, or generate instant notes."
  },
  {
    id: "faq-4",
    category: "Models & Pricing",
    question: "Do I need my own API keys to use EchoGPT?",
    answer: "No! EchoGPT provides turnkey access to all supported frontier models under a single flexible plan. Power users who prefer bringing their own OpenAI / Anthropic / OpenRouter API keys can also configure custom endpoints in Settings for direct BYOK usage."
  },
  {
    id: "faq-5",
    category: "Models & Pricing",
    question: "What is the Dual-Model Arena mode?",
    answer: "The Dual-Model Arena allows you to send a single prompt to two different models simultaneously (for example, GPT-4o vs Claude 3.5 Sonnet). Responses stream side-by-side in real time, making it effortless to compare reasoning quality, code elegance, or creative voice."
  },
  {
    id: "faq-6",
    category: "Privacy & Security",
    question: "How is my browsing data and chat history protected?",
    answer: "EchoGPT enforces a strict zero-data retention policy for webpage context. Page content is only analyzed on-demand when you explicitly trigger an action or toggle context-sharing. Conversations are securely encrypted and stored locally in your browser storage."
  },
  {
    id: "faq-7",
    category: "General",
    question: "Can I use EchoGPT on mobile devices and tablets?",
    answer: "Yes! The EchoGPT web application is fully responsive across mobile, tablet, and desktop screens with custom touch gestures, swipeable sidebars, and fluid adaptive typography."
  }
];

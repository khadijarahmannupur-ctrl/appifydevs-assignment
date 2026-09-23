export type ModelProvider = "openai" | "anthropic" | "google" | "deepseek" | "meta" | "mistral";

export interface AIModel {
  id: string;
  name: string;
  shortName: string;
  provider: ModelProvider;
  providerName: string;
  description: string;
  badge?: string;
  contextWindow: string;
  tokensPerSec: number;
  latencyMs: number;
  iconBg: string;
  strengths: string[];
  isPremium?: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
  modelId?: string;
  modelName?: string;
  isStreaming?: boolean;
  tokens?: number;
  latencyMs?: number;
  rating?: "like" | "dislike" | null;
  error?: boolean;
  pageContext?: {
    url: string;
    title: string;
    selectedText?: string;
  };
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  modelId: string;
  messages: ChatMessage[];
  isPinned?: boolean;
  tags?: string[];
  systemPrompt?: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: "Coding" | "Job Search" | "Writing" | "Analysis" | "Learning" | "Productivity";
  prompt: string;
  modelSuggestion?: string;
  iconName?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Extension" | "Models & Pricing" | "Privacy & Security";
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  favoriteModel: string;
  badge: string;
}

export interface ExtensionSettings {
  defaultModelId: string;
  shortcut: string;
  streamSpeed: "normal" | "fast" | "instant";
  autoCapturePageContext: boolean;
  floatingCopilotEnabled: boolean;
  theme: "system" | "dark" | "light";
  apiKeyConfigured: boolean;
}

export type ExtensionActiveTab = "chat" | "history" | "actions" | "settings";

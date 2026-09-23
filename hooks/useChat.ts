"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { ChatMessage, Conversation, AIModel } from "@/types";
import { SAMPLE_MODELS, DEFAULT_MODEL_ID } from "@/data/models";
import { useLocalStorage } from "./useLocalStorage";

const INITIAL_GREETING: ChatMessage = {
  id: "msg-welcome",
  role: "assistant",
  modelId: "gpt-4o",
  modelName: "GPT-4o Omnichannel",
  timestamp: Date.now(),
  content: `👋 Hello! I am **EchoGPT**, your unified multi-model AI productivity assistant.

You can switch seamlessly between **GPT-4o**, **Claude 3.5 Sonnet**, **Gemini 1.5 Pro**, **DeepSeek R1**, and **Llama 3.3 70B** without losing your workflow context.

### What would you like to explore today?
- 💻 **Code Review & Refactoring**: Paste code or generate full TypeScript components
- ⚔️ **Dual-Model Arena**: Compare two frontier models side-by-side
- 📄 **Job Tailored Cover Letters**: Generate high-converting job applications for AppifyDevs
- ⚡ **Page Summarizer**: Extract actionable TL;DRs with browser context

*Press \`/\` in the prompt box or click the Template Library to get started instantly.*`,
  tokens: 142,
  latencyMs: 290,
};

const INITIAL_CONVERSATION: Conversation = {
  id: "conv-default",
  title: "Welcome to EchoGPT",
  createdAt: Date.now(),
  updatedAt: Date.now(),
  modelId: DEFAULT_MODEL_ID,
  messages: [INITIAL_GREETING],
  isPinned: true,
  tags: ["Getting Started", "Multi-Model"],
};

export function useChat() {
  const [conversations, setConversations] = useLocalStorage<Conversation[]>(
    "echogpt_conversations",
    [INITIAL_CONVERSATION]
  );
  const [activeConvId, setActiveConvId] = useLocalStorage<string>(
    "echogpt_active_conv",
    INITIAL_CONVERSATION.id
  );
  const [activeModelId, setActiveModelId] = useLocalStorage<string>(
    "echogpt_active_model",
    DEFAULT_MODEL_ID
  );
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingTelemetry, setStreamingTelemetry] = useState<{
    tokens: number;
    speed: number;
    latencyMs: number;
  }>({ tokens: 0, speed: 0, latencyMs: 0 });

  // Screen reader accessible announcement state: updated ONLY when generation finishes
  const [screenReaderAnnouncement, setScreenReaderAnnouncement] = useState<string>("");

  const streamIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<boolean>(false);

  // Active conversation object
  const activeConversation =
    conversations.find((c) => c.id === activeConvId) || conversations[0] || INITIAL_CONVERSATION;

  const currentModel =
    SAMPLE_MODELS.find((m) => m.id === activeModelId) || SAMPLE_MODELS[0];

  // Stop current streaming
  const stopStreaming = useCallback(() => {
    abortControllerRef.current = true;
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
    };
  }, []);

  // Generate realistic simulated AI response
  const generateSimulatedResponse = (promptText: string, model: AIModel): string => {
    const lower = promptText.toLowerCase();

    if (lower.includes("cover letter") || lower.includes("internship") || lower.includes("appifydevs")) {
      return `### Application for Frontend Internship — AppifyDevs

**Dear AppifyDevs Hiring Team,**

I am thrilled to submit my application for the **Frontend Internship** at **AppifyDevs**. As a frontend developer passionate about building ultra-responsive, accessible, and visually stunning web applications, I have closely admired AppifyDevs' work on **EchoGPT** and your multi-model AI productivity ecosystem.

#### Key Value & Technical Alignment:
1. **Next.js & Modern React Architecture**: Deep experience building with Next.js App Router, React Server/Client Components, dynamic code-splitting, and clean modular state trees.
2. **Tailwind CSS & Design Systems**: Mastery over atomic design, fluid responsive layouts (mobile, tablet, desktop), dark/light mode theming, and glassmorphic micro-interactions.
3. **Framer Motion & Fluid UX**: Crafting buttery-smooth page transitions, spring-based interactions, and respecting \`prefers-reduced-motion\`.
4. **Accessibility (WCAG 2.1 AA)**: Ensuring 100% keyboard navigability, high-contrast visual standards, ARIA landmark semantics, and accessible screen reader live regions.
5. **Chrome Extension Development**: Practical experience designing and implementing Chrome Side Panel workflows, text selection triggers, and active tab context bridges.

I would love the opportunity to contribute my energy, attention to detail, and frontend problem-solving skills to the AppifyDevs engineering team.

Thank you for your time and consideration.

**Best regards,**
*Senior Frontend Applicant*`;
    }

    if (lower.includes("code") || lower.includes("refactor") || lower.includes("typescript") || lower.includes("react")) {
      return `Here is the optimized, accessible, and clean **TypeScript + Tailwind CSS** solution:

\`\`\`typescript
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, Copy } from "lucide-react";

interface ActionCardProps {
  title: string;
  description: string;
  snippet: string;
  onExecute?: () => void;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  snippet,
  onExecute,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [snippet]);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-lg transition-all"
    >
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-500" aria-hidden="true" />
          <h4 className="font-semibold text-slate-900 dark:text-white">{title}</h4>
        </div>
        <button
          onClick={handleCopy}
          aria-label={copied ? "Copied snippet" : "Copy snippet"}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{description}</p>
    </motion.div>
  );
};
\`\`\`

### Architectural Improvements Made:
- **Type Safety**: Fully typed interfaces with optional handlers.
- **Accessibility**: Includes \`aria-label\` for the copy action and \`aria-hidden="true"\` on decorative icons.
- **Performance**: Wrapped handlers in \`useCallback\` to prevent unnecessary child re-renders.`;
    }

    if (lower.includes("summarize") || lower.includes("summary") || lower.includes("tldr")) {
      return `### ⚡ Executive Summary & Key Insights

**Document / Web Page Analysis:**

1. 💡 **Core Thesis**: Unifying multiple frontier LLMs inside a persistent browser side panel reduces cognitive tab switching and increases developer speed by over **35%**.
2. 📌 **Top Key Takeaways**:
   - **Multi-Model Synergy**: Allows real-time switching between Claude 3.5 Sonnet for code and GPT-4o for complex reasoning.
   - **Zero Context Switching**: Browser side panel integration captures the active page DOM without copying and pasting.
   - **In-Page Copilot**: Floating context actions streamline reading long documentation and technical repositories.
3. ⏱️ **Estimated Time Saved**: ~15 minutes per research session.`;
    }

    // Default rich response
    return `### Analysis & Solution from **${model.name}**

Thank you for your prompt! Here is the breakdown formulated by **${model.name}** (${model.providerName}):

1. **Strategic Assessment**:
   - Leveraging ${model.contextWindow} of context for deep structural analysis.
   - Prioritizing modularity, high signal-to-noise ratio, and measurable output.

2. **Key Recommendation**:
   - Utilize automated prompt templates for repetitive tasks.
   - Run side-by-side verification in the **Dual-Model Arena** when testing critical architectural decisions.

3. **Actionable Step**:
   - You can copy this output directly, export the session, or fork this conversation to explore alternative iterations.

*Generated with ${model.name} sample response engine (${model.tokensPerSec} tokens/s).*`;
  };

  // Send a new message
  const sendMessage = useCallback(
    async (
      content: string,
      modelOverride?: AIModel,
      pageContext?: { url: string; title: string; selectedText?: string }
    ) => {
      if (!content.trim() || isStreaming) return;

      const targetModel = modelOverride || currentModel;
      const userMessageId = `msg-user-${Date.now()}`;
      const assistantMessageId = `msg-ai-${Date.now()}`;

      const userMessage: ChatMessage = {
        id: userMessageId,
        role: "user",
        content: content.trim(),
        timestamp: Date.now(),
        pageContext,
      };

      const emptyAssistantMessage: ChatMessage = {
        id: assistantMessageId,
        role: "assistant",
        content: "",
        modelId: targetModel.id,
        modelName: targetModel.name,
        timestamp: Date.now(),
        isStreaming: true,
      };

      // Add user message & placeholder assistant message
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === activeConversation.id) {
            const isFirstUserMessage = conv.messages.filter((m) => m.role === "user").length === 0;
            const updatedTitle = isFirstUserMessage
              ? content.slice(0, 32).trim() + (content.length > 32 ? "..." : "")
              : conv.title;

            return {
              ...conv,
              title: updatedTitle,
              updatedAt: Date.now(),
              messages: [...conv.messages, userMessage, emptyAssistantMessage],
            };
          }
          return conv;
        })
      );

      // Start streaming simulation
      setIsStreaming(true);
      abortControllerRef.current = false;

      const fullResponseText = generateSimulatedResponse(content, targetModel);
      let streamedLength = 0;
      const chunkSize = Math.max(2, Math.floor(targetModel.tokensPerSec / 25));
      const intervalMs = 25;
      const startTime = Date.now();

      streamIntervalRef.current = setInterval(() => {
        if (abortControllerRef.current) {
          if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
          setIsStreaming(false);
          return;
        }

        streamedLength += chunkSize;
        const currentChunk = fullResponseText.slice(0, streamedLength);
        const isFinished = streamedLength >= fullResponseText.length;
        const elapsedSec = Math.max(0.1, (Date.now() - startTime) / 1000);
        const estimatedTokens = Math.floor(streamedLength / 4);
        const currentSpeed = Math.round(estimatedTokens / elapsedSec);

        setStreamingTelemetry({
          tokens: estimatedTokens,
          speed: Math.max(targetModel.tokensPerSec - 10, currentSpeed),
          latencyMs: targetModel.latencyMs,
        });

        setConversations((prev) =>
          prev.map((conv) => {
            if (conv.id === activeConversation.id) {
              const updatedMessages = conv.messages.map((msg) => {
                if (msg.id === assistantMessageId) {
                  return {
                    ...msg,
                    content: isFinished ? fullResponseText : currentChunk,
                    isStreaming: !isFinished,
                    tokens: estimatedTokens,
                    latencyMs: targetModel.latencyMs,
                  };
                }
                return msg;
              });
              return { ...conv, updatedAt: Date.now(), messages: updatedMessages };
            }
            return conv;
          })
        );

        if (isFinished) {
          if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
          setIsStreaming(false);
          // Announce completion to screen reader (WCAG compliance)
          setScreenReaderAnnouncement(
            `Response received from ${targetModel.name}: ${fullResponseText.slice(0, 120)}... Finished.`
          );
        }
      }, intervalMs);
    },
    [isStreaming, currentModel, activeConversation.id, setConversations]
  );

  // Create new conversation
  const createNewConversation = useCallback(
    (customTitle?: string, initialModelId?: string) => {
      const newId = `conv-${Date.now()}`;
      const newModel = initialModelId || activeModelId;
      const modelObj = SAMPLE_MODELS.find((m) => m.id === newModel) || SAMPLE_MODELS[0];

      const newConv: Conversation = {
        id: newId,
        title: customTitle || "New Conversation",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        modelId: newModel,
        messages: [
          {
            id: `msg-${Date.now()}`,
            role: "assistant",
            modelId: modelObj.id,
            modelName: modelObj.name,
            timestamp: Date.now(),
            content: `New chat session started with **${modelObj.name}**. How can I help you?`,
            tokens: 24,
            latencyMs: modelObj.latencyMs,
          },
        ],
        tags: ["General"],
      };

      setConversations((prev) => [newConv, ...prev]);
      setActiveConvId(newId);
      return newId;
    },
    [activeModelId, setConversations, setActiveConvId]
  );

  // Delete conversation
  const deleteConversation = useCallback(
    (convId: string) => {
      setConversations((prev) => {
        const filtered = prev.filter((c) => c.id !== convId);
        if (filtered.length === 0) {
          return [INITIAL_CONVERSATION];
        }
        return filtered;
      });
      if (activeConvId === convId) {
        const remaining = conversations.filter((c) => c.id !== convId);
        setActiveConvId(remaining[0]?.id || INITIAL_CONVERSATION.id);
      }
    },
    [activeConvId, conversations, setConversations, setActiveConvId]
  );

  // Pin / Unpin conversation
  const togglePinConversation = useCallback(
    (convId: string) => {
      setConversations((prev) =>
        prev.map((c) => (c.id === convId ? { ...c, isPinned: !c.isPinned } : c))
      );
    },
    [setConversations]
  );

  // Rate message (like/dislike)
  const rateMessage = useCallback(
    (messageId: string, rating: "like" | "dislike") => {
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === activeConversation.id) {
            const updated = conv.messages.map((m) =>
              m.id === messageId ? { ...m, rating: m.rating === rating ? null : rating } : m
            );
            return { ...conv, messages: updated };
          }
          return conv;
        })
      );
    },
    [activeConversation.id, setConversations]
  );

  // Clear all chats
  const clearAllConversations = useCallback(() => {
    setConversations([INITIAL_CONVERSATION]);
    setActiveConvId(INITIAL_CONVERSATION.id);
  }, [setConversations, setActiveConvId]);

  return {
    conversations,
    activeConversation,
    activeConvId,
    setActiveConvId,
    activeModelId,
    setActiveModelId,
    currentModel,
    isStreaming,
    streamingTelemetry,
    screenReaderAnnouncement,
    sendMessage,
    stopStreaming,
    createNewConversation,
    deleteConversation,
    togglePinConversation,
    rateMessage,
    clearAllConversations,
  };
}

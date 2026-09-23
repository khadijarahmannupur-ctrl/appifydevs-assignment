import { TestimonialItem } from "@/types";

export const SAMPLE_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    author: "Alex Rivera",
    role: "Staff Software Engineer",
    company: "DevScale Labs",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    content: "Having Claude 3.5 Sonnet and GPT-4o pinned directly in my Chrome Side Panel while reviewing pull requests saves me at least an hour every single day. The dual-model arena is game-changing for complex refactors.",
    rating: 5,
    favoriteModel: "Claude 3.5 Sonnet",
    badge: "Verified Engineer"
  },
  {
    id: "test-2",
    author: "Elena Rostova",
    role: "Senior Product Researcher",
    company: "OmniMetrics",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    content: "The 1-click page summarizer with context awareness completely transformed my academic research workflow. I can synthesize 40-page papers in seconds without tab-switching friction.",
    rating: 5,
    favoriteModel: "Gemini 1.5 Pro",
    badge: "Power Researcher"
  },
  {
    id: "test-3",
    author: "Marcus Chen",
    role: "Full-Stack Developer & Creator",
    company: "NextWave Tech",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    content: "I replaced 3 separate $20/month AI subscriptions with EchoGPT. The keyboard shortcuts (Ctrl+Shift+E, Cmd+K) make the UX feel like an extension of my own brain.",
    rating: 5,
    favoriteModel: "DeepSeek R1",
    badge: "Pro Subscriber"
  },
  {
    id: "test-4",
    author: "Sarah Jenkins",
    role: "Technical Content Strategist",
    company: "CloudNative Daily",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    content: "The in-page floating copilot that triggers when highlighting text is the smoothest micro-interaction I've experienced in any Chrome extension. Phenomenal attention to detail.",
    rating: 5,
    favoriteModel: "GPT-4o",
    badge: "Content Creator"
  }
];

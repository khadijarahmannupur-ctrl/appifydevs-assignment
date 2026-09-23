import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/common/ThemeProvider";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EchoGPT | Multi-AI Chat, Chrome Side Panel & Productivity Suite",
  description:
    "Unified multi-model AI assistant bringing GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, DeepSeek R1, and Llama 3.3 to your web browser side panel and workflow. Built for AppifyDevs.",
  keywords: [
    "EchoGPT",
    "AppifyDevs",
    "Multi-AI Chat",
    "Chrome Side Panel",
    "GPT-4o",
    "Claude 3.5",
    "Gemini 1.5",
    "DeepSeek R1",
    "Web Summarizer",
    "AI Productivity",
  ],
  authors: [{ name: "AppifyDevs Candidate", url: "https://echogpt.live" }],
  creator: "AppifyDevs",
  openGraph: {
    title: "EchoGPT | Multi-AI Chat & Chrome Side Panel",
    description:
      "Seamlessly chat, summarize web pages, and compare frontier AI models side-by-side without switching tabs.",
    url: "https://echogpt.live",
    siteName: "EchoGPT by AppifyDevs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EchoGPT | Multi-AI Chat & Chrome Side Panel",
    description: "Switch frontier AI models seamlessly right from your browser side panel.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f19" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0B0F19] dark:text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white transition-colors duration-200">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium text-sm"
        >
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

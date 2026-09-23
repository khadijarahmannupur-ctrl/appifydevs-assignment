"use client";

import React, { useState } from "react";
import { Conversation } from "@/types";
import { formatDate, cn } from "@/lib/utils";
import { ChromeIcon } from "@/components/common/BrandIcons";
import {
  Plus,
  Search,
  MessageSquare,
  Pin,
  Trash2,
  Sparkles,
  Swords,
  ArrowLeft,
  X,
  Keyboard,
  Download,
} from "lucide-react";
import { SampleDataBadge } from "@/components/common/SampleDataBadge";

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConvId: string;
  onSelectConv: (id: string) => void;
  onNewChat: () => void;
  onDeleteConv: (id: string) => void;
  onTogglePin: (id: string) => void;
  onClearAll: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  isArenaActive: boolean;
  onToggleArena: () => void;
  onOpenShortcuts: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  conversations,
  activeConvId,
  onSelectConv,
  onNewChat,
  onDeleteConv,
  onTogglePin,
  onClearAll,
  isOpenMobile,
  onCloseMobile,
  isArenaActive,
  onToggleArena,
  onOpenShortcuts,
}) => {
  const [search, setSearch] = useState("");

  const filteredConversations = conversations.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  const pinned = filteredConversations.filter((c) => c.isPinned);
  const recent = filteredConversations.filter((c) => !c.isPinned);

  const exportAllToMarkdown = () => {
    let md = `# EchoGPT Conversation Export\n\nGenerated: ${new Date().toLocaleString()}\n\n---\n\n`;
    conversations.forEach((conv) => {
      md += `## ${conv.title}\n*Created: ${new Date(conv.createdAt).toLocaleString()}*\n\n`;
      conv.messages.forEach((msg) => {
        md += `### ${msg.role === "user" ? "👤 User" : `🤖 ${msg.modelName || "Assistant"}`}\n${msg.content}\n\n`;
      });
      md += `\n---\n\n`;
    });

    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `echogpt-chat-export-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-50/90 dark:bg-slate-900/90 border-r border-slate-200/80 dark:border-slate-800/80 p-3.5 backdrop-blur-xl">
      {/* Top Brand Bar */}
      <div className="flex items-center justify-between gap-2 px-1 mb-3">
        <a
          href="/"
          className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base hover:opacity-80 transition"
        >
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <span>EchoGPT</span>
        </a>
        <div className="flex items-center gap-1">
          <SampleDataBadge variant="subtle" text="Demo" />
          {isOpenMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-200 lg:hidden cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* New Chat & Dual Arena Button */}
      <div className="space-y-1.5 mb-3">
        <button
          type="button"
          onClick={() => {
            onNewChat();
            if (isOpenMobile) onCloseMobile();
          }}
          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm shadow-indigo-500/20 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98] transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Chat</span>
        </button>

        {/* Dual-Model Arena Toggle */}
        <button
          type="button"
          onClick={() => {
            onToggleArena();
            if (isOpenMobile) onCloseMobile();
          }}
          className={cn(
            "w-full py-2 px-3 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-between border transition cursor-pointer select-none",
            isArenaActive
              ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/40"
              : "bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200/60 dark:border-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700"
          )}
        >
          <div className="flex items-center gap-2">
            <Swords className={cn("w-4 h-4", isArenaActive ? "text-amber-500" : "text-slate-400")} />
            <span>Dual-Model Arena</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-semibold">
            Compare
          </span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-3">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search history..."
          className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 border border-slate-200/80 dark:border-slate-700/60 outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* Conversations Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {/* Pinned Chats */}
        {pinned.length > 0 && (
          <div>
            <div className="flex items-center gap-1 px-2 mb-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <Pin className="w-3 h-3 text-indigo-500" />
              <span>Pinned</span>
            </div>
            <div className="space-y-1">
              {pinned.map((conv) => renderConvItem(conv))}
            </div>
          </div>
        )}

        {/* Recent Chats */}
        <div>
          <div className="flex items-center gap-1 px-2 mb-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <MessageSquare className="w-3 h-3 text-slate-400" />
            <span>Recent Conversations</span>
          </div>
          {recent.length === 0 && pinned.length === 0 ? (
            <p className="px-3 py-4 text-xs text-slate-400 text-center">No chats found</p>
          ) : (
            <div className="space-y-1">
              {recent.map((conv) => renderConvItem(conv))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer Tools */}
      <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={exportAllToMarkdown}
            className="flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition cursor-pointer"
            title="Export chats to Markdown"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Markdown</span>
          </button>
          <button
            type="button"
            onClick={onOpenShortcuts}
            className="flex items-center gap-1 p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition cursor-pointer"
            title="Keyboard Shortcuts"
          >
            <Keyboard className="w-3.5 h-3.5" />
            <kbd className="px-1 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-mono">?</kbd>
          </button>
        </div>

        <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
          <a
            href="/extension"
            className="flex items-center gap-1 hover:text-indigo-500 transition"
          >
            <ChromeIcon className="w-3 h-3" />
            <span>Extension Concept →</span>
          </a>
          <button
            onClick={onClearAll}
            className="text-slate-400 hover:text-red-500 transition cursor-pointer"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );

  function renderConvItem(conv: Conversation) {
    const isActive = activeConvId === conv.id && !isArenaActive;
    return (
      <div
        key={conv.id}
        onClick={() => {
          onSelectConv(conv.id);
          if (isOpenMobile) onCloseMobile();
        }}
        className={cn(
          "group flex items-center justify-between p-2 rounded-xl text-left text-xs transition cursor-pointer select-none",
          isActive
            ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200/80 dark:border-indigo-800/60"
            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
        )}
      >
        <div className="flex items-center gap-2 truncate pr-1">
          <MessageSquare className={cn("w-3.5 h-3.5 shrink-0", isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400")} />
          <span className="truncate">{conv.title}</span>
        </div>

        {/* Action icons on hover */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin(conv.id);
            }}
            aria-label={conv.isPinned ? "Unpin chat" : "Pin chat"}
            className={cn(
              "p-1 rounded text-slate-400 hover:text-indigo-600 transition",
              conv.isPinned && "opacity-100 text-indigo-500"
            )}
          >
            <Pin className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteConv(conv.id);
            }}
            aria-label="Delete chat"
            className="p-1 rounded text-slate-400 hover:text-red-500 transition"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-72 h-screen shrink-0 sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile / Tablet Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          />
          <div className="relative w-72 max-w-[85vw] h-full z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

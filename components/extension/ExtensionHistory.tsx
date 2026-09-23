"use client";

import React, { useState } from "react";
import { Search, Pin, Trash2, MessageSquare, Clock, Globe, ArrowRight } from "lucide-react";
import { Conversation } from "@/types";
import { formatDate, cn } from "@/lib/utils";

interface ExtensionHistoryProps {
  conversations: Conversation[];
  onSelectConv: (id: string) => void;
  onTogglePin: (id: string) => void;
  onDeleteConv: (id: string) => void;
}

export const ExtensionHistory: React.FC<ExtensionHistoryProps> = ({
  conversations,
  onSelectConv,
  onTogglePin,
  onDeleteConv,
}) => {
  const [search, setSearch] = useState("");

  const filtered = conversations.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  const pinned = filtered.filter((c) => c.isPinned);
  const recent = filtered.filter((c) => !c.isPinned);

  return (
    <div className="p-3.5 space-y-3 h-full flex flex-col overflow-hidden">
      {/* Search Bar */}
      <div className="relative shrink-0">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search extension chats & summaries..."
          className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 border border-slate-200/80 dark:border-slate-700/60 outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* History Items Scroll */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {/* Pinned */}
        {pinned.length > 0 && (
          <div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              <Pin className="w-3 h-3 text-indigo-500" />
              <span>Pinned Items</span>
            </div>
            <div className="space-y-1.5">{pinned.map((c) => renderItem(c))}</div>
          </div>
        )}

        {/* Recent */}
        <div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>Recent Activity</span>
          </div>
          {recent.length === 0 && pinned.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              <MessageSquare className="w-6 h-6 mx-auto mb-2 opacity-40" />
              <span>No history items recorded yet</span>
            </div>
          ) : (
            <div className="space-y-1.5">{recent.map((c) => renderItem(c))}</div>
          )}
        </div>
      </div>
    </div>
  );

  function renderItem(conv: Conversation) {
    return (
      <div
        key={conv.id}
        onClick={() => onSelectConv(conv.id)}
        className="group p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200/80 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-800 transition cursor-pointer select-none flex items-center justify-between gap-2 text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              {conv.title}
            </h4>
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2">
            <span>{formatDate(conv.updatedAt)}</span>
            <span>•</span>
            <span>{conv.messages.length} messages</span>
          </p>
        </div>

        {/* Pin and Delete Controls */}
        <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin(conv.id);
            }}
            aria-label={conv.isPinned ? "Unpin item" : "Pin item"}
            className={cn(
              "p-1 rounded text-slate-400 hover:text-indigo-600 transition",
              conv.isPinned && "text-indigo-500 font-bold"
            )}
            title={conv.isPinned ? "Unpin" : "Pin"}
          >
            <Pin className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteConv(conv.id);
            }}
            aria-label="Delete history item"
            className="p-1 rounded text-slate-400 hover:text-red-500 transition"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }
};

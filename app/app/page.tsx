"use client";

import React, { useState } from "react";
import { useChat } from "@/hooks/useChat";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { ChatSidebar } from "@/components/webapp/ChatSidebar";
import { ChatArea } from "@/components/webapp/ChatArea";
import { ArenaView } from "@/components/webapp/ArenaView";
import { CommandPalette } from "@/components/common/CommandPalette";
import { KeyboardShortcutModal } from "@/components/common/KeyboardShortcutModal";

export default function EchoGPTWebAppPage() {
  const chat = useChat();
  const [isOpenMobileSidebar, setIsOpenMobileSidebar] = useState(false);
  const [isArenaActive, setIsArenaActive] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  // Keyboard shortcut: Cmd+K / Ctrl+K opens Command Palette
  useKeyboardShortcut("k", () => setIsCommandPaletteOpen((prev) => !prev), {
    ctrlOrCmd: true,
  });

  // Keyboard shortcut: ? opens shortcuts modal
  useKeyboardShortcut("?", () => setIsShortcutsOpen((prev) => !prev));

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-[#0B0F19]">
      {/* Sidebar */}
      <ChatSidebar
        conversations={chat.conversations}
        activeConvId={chat.activeConvId}
        onSelectConv={(id) => {
          chat.setActiveConvId(id);
          setIsArenaActive(false);
        }}
        onNewChat={() => {
          chat.createNewConversation();
          setIsArenaActive(false);
        }}
        onDeleteConv={chat.deleteConversation}
        onTogglePin={chat.togglePinConversation}
        onClearAll={chat.clearAllConversations}
        isOpenMobile={isOpenMobileSidebar}
        onCloseMobile={() => setIsOpenMobileSidebar(false)}
        isArenaActive={isArenaActive}
        onToggleArena={() => setIsArenaActive((prev) => !prev)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* Main Content: Chat View or Dual Arena View */}
      {isArenaActive ? (
        <ArenaView />
      ) : (
        <ChatArea
          chat={chat}
          onOpenMobileSidebar={() => setIsOpenMobileSidebar(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />
      )}

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectModel={(modelId) => {
          chat.setActiveModelId(modelId);
          setIsArenaActive(false);
        }}
        onSelectPrompt={(tmpl) => {
          chat.sendMessage(tmpl.prompt);
          setIsArenaActive(false);
        }}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* Shortcuts Modal */}
      <KeyboardShortcutModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}

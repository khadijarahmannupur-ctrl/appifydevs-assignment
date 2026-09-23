"use client";

import React from "react";
import { Modal } from "./Modal";
import { Command, Keyboard } from "lucide-react";

interface KeyboardShortcutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShortcutItem {
  keys: string[];
  description: string;
  scope: string;
}

const SHORTCUTS: ShortcutItem[] = [
  {
    keys: ["⌘ / Ctrl", "K"],
    description: "Open Global Command Palette (Navigate, Switch Models, Templates)",
    scope: "Everywhere",
  },
  {
    keys: ["Ctrl", "Shift", "E"],
    description: "Toggle Chrome Extension Side Panel / Quick Assistant",
    scope: "Browser / Extension",
  },
  {
    keys: ["/"],
    description: "Open Prompt Template Library in prompt box",
    scope: "Chat & Extension",
  },
  {
    keys: ["Enter"],
    description: "Send prompt / trigger action",
    scope: "Input box",
  },
  {
    keys: ["Shift", "Enter"],
    description: "Insert newline without submitting",
    scope: "Input box",
  },
  {
    keys: ["Esc"],
    description: "Close active modal, popup, or command palette",
    scope: "Modals",
  },
  {
    keys: ["?"],
    description: "Open this Keyboard Shortcuts cheat sheet",
    scope: "Everywhere",
  },
];

export const KeyboardShortcutModal: React.FC<KeyboardShortcutModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Keyboard Shortcuts"
      description="Supercharge your productivity with quick keyboard shortcuts."
      maxWidth="md"
    >
      <div className="space-y-4 pt-2">
        <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {SHORTCUTS.map((shortcut, idx) => (
            <div
              key={idx}
              className="py-3 flex items-center justify-between gap-4 text-sm first:pt-0 last:pb-0"
            >
              <div className="flex flex-col">
                <span className="text-slate-800 dark:text-slate-200 font-medium">
                  {shortcut.description}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">{shortcut.scope}</span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {shortcut.keys.map((k, kIdx) => (
                  <kbd
                    key={kIdx}
                    className="px-2 py-1 text-xs font-mono font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-xs"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
          <Keyboard className="w-4 h-4 text-indigo-500 shrink-0" aria-hidden="true" />
          <span>
            Pro tip: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[10px]">?</kbd> at any time to re-open this guide.
          </span>
        </div>
      </div>
    </Modal>
  );
};

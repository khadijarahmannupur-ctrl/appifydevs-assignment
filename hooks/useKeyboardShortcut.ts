"use client";

import { useEffect } from "react";

interface ShortcutOptions {
  ctrlOrCmd?: boolean;
  shift?: boolean;
  alt?: boolean;
  preventDefault?: boolean;
}

export function useKeyboardShortcut(
  key: string,
  callback: (e: KeyboardEvent) => void,
  options: ShortcutOptions = {}
) {
  const { ctrlOrCmd = false, shift = false, alt = false, preventDefault = true } = options;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
      const isModifierActive = isMac ? event.metaKey : event.ctrlKey;

      const matchesKey = event.key.toLowerCase() === key.toLowerCase();
      const matchesModifier = ctrlOrCmd ? isModifierActive : true;
      const matchesShift = shift ? event.shiftKey : !event.shiftKey || key.toUpperCase() === key;
      const matchesAlt = alt ? event.altKey : !event.altKey;

      if (matchesKey && matchesModifier && matchesShift && matchesAlt) {
        if (preventDefault) {
          event.preventDefault();
        }
        callback(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [key, callback, ctrlOrCmd, shift, alt, preventDefault]);
}

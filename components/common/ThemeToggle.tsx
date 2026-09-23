"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md";
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className, size = "md" }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 animate-pulse",
          className
        )}
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200/70 dark:hover:bg-slate-700/70 border border-slate-200/80 dark:border-slate-700/60 transition-all active:scale-95 cursor-pointer shadow-sm",
        size === "sm" ? "p-1.5" : "p-2",
        className
      )}
    >
      {isDark ? (
        <Sun className={cn(size === "sm" ? "w-4 h-4" : "w-4.5 h-4.5", "text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45")} />
      ) : (
        <Moon className={cn(size === "sm" ? "w-4 h-4" : "w-4.5 h-4.5", "text-indigo-600 transition-transform duration-300 rotate-0 hover:-rotate-12")} />
      )}
    </button>
  );
};

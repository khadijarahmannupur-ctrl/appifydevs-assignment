"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: "pills" | "underline" | "segments";
  size?: "sm" | "md";
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
  variant = "segments",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "text-xs py-1.5 px-3 gap-1.5",
    md: "text-sm py-2 px-4 gap-2",
  };

  if (variant === "segments") {
    return (
      <div
        role="tablist"
        className={cn(
          "inline-flex items-center p-1 bg-slate-100/90 dark:bg-slate-800/80 backdrop-blur-md rounded-xl border border-slate-200/60 dark:border-slate-700/60",
          className
        )}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              className={cn(
                "relative font-medium rounded-lg flex items-center justify-center transition-colors duration-150 z-10 cursor-pointer select-none",
                sizeClasses[size],
                isActive
                  ? "text-slate-900 dark:text-white font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              )}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  {tab.badge}
                </span>
              )}
              {isActive && (
                <motion.div
                  layoutId="active-tab-segment"
                  transition={{ type: "spring", duration: 0.3, bounce: 0.15 }}
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-700/80 -z-10"
                />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Underline variant
  return (
    <div
      role="tablist"
      className={cn("flex border-b border-slate-200 dark:border-slate-800 gap-2", className)}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative font-medium pb-3 pt-1 px-3 flex items-center gap-2 transition-colors cursor-pointer select-none",
              isActive
                ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
            )}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {isActive && (
              <motion.div
                layoutId="active-tab-underline"
                transition={{ type: "spring", duration: 0.3, bounce: 0.15 }}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  shortLabel?: string;
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [tabs]);

  const sizeClasses = {
    sm: "text-[11px] sm:text-xs py-1 px-2.5 sm:px-3 gap-1.5",
    md: "text-xs sm:text-sm py-1.5 px-3 sm:px-4 gap-1.5 sm:gap-2",
  };

  if (variant === "segments") {
    return (
      <div className="relative max-w-full w-full sm:w-auto min-w-0 overflow-hidden">
        {/* Left Scroll Gradient Fade */}
        {canScrollLeft && (
          <div
            className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-slate-50 dark:from-[#0B0F19] to-transparent z-20 pointer-events-none sm:hidden"
            aria-hidden="true"
          />
        )}

        {/* Scrollable Container */}
        <div
          ref={containerRef}
          onScroll={checkScroll}
          className="w-full overflow-x-auto no-scrollbar flex items-center justify-start sm:justify-center p-0.5 min-w-0 max-w-full"
        >
          <div
            role="tablist"
            className={cn(
              "inline-flex items-center p-1 bg-slate-100/90 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shrink-0",
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
                    "relative font-medium rounded-xl flex items-center justify-center transition-colors duration-150 z-10 cursor-pointer select-none whitespace-nowrap shrink-0",
                    sizeClasses[size],
                    isActive
                      ? "text-slate-900 dark:text-white font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  )}
                >
                  {tab.icon && <span className="shrink-0">{tab.icon}</span>}
                  
                  {/* Responsive Short Label on Mobile (<sm) & Full Label on sm+ */}
                  {tab.shortLabel ? (
                    <>
                      <span className="sm:hidden">{tab.shortLabel}</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                    </>
                  ) : (
                    <span>{tab.label}</span>
                  )}

                  {tab.badge !== undefined && (
                    <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {tab.badge}
                    </span>
                  )}

                  {isActive && (
                    <motion.div
                      layoutId="active-tab-segment"
                      transition={{ type: "spring", duration: 0.3, bounce: 0.15 }}
                      className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-xs border border-slate-200/80 dark:border-slate-700/80 -z-10"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Scroll Gradient Fade */}
        {canScrollRight && (
          <div
            className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-slate-50 dark:from-[#0B0F19] to-transparent z-20 pointer-events-none sm:hidden"
            aria-hidden="true"
          />
        )}
      </div>
    );
  }

  // Underline variant
  return (
    <div className="relative max-w-full w-full">
      <div
        ref={containerRef}
        onScroll={checkScroll}
        className="w-full overflow-x-auto no-scrollbar"
      >
        <div
          role="tablist"
          className={cn("flex border-b border-slate-200 dark:border-slate-800 gap-2 shrink-0 min-w-full", className)}
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
                  "relative font-medium pb-3 pt-1 px-3 flex items-center gap-1.5 sm:gap-2 transition-colors cursor-pointer select-none whitespace-nowrap shrink-0 text-xs sm:text-sm",
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400 font-bold"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                )}
              >
                {tab.icon && <span className="shrink-0">{tab.icon}</span>}
                {tab.shortLabel ? (
                  <>
                    <span className="sm:hidden">{tab.shortLabel}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </>
                ) : (
                  <span>{tab.label}</span>
                )}
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
      </div>
    </div>
  );
};

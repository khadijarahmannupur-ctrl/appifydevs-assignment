"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glass?: boolean;
  glow?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = false, glass = true, glow = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl p-6 transition-all duration-200",
          glass
            ? "glass-card shadow-sm shadow-slate-950/5"
            : "bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm",
          hoverEffect &&
            "hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-300 dark:hover:border-indigo-500/30",
          glow && "relative before:absolute before:-inset-px before:rounded-2xl before:bg-gradient-to-r before:from-indigo-500/20 before:to-violet-500/20 before:-z-10",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

"use client";

import React, { useState, useRef, useEffect } from "react";
import { SAMPLE_MODELS } from "@/data/models";
import { AIModel } from "@/types";
import { ChevronDown, Check, Zap, Sparkles, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModelSelectorProps {
  selectedModelId: string;
  onSelectModel: (modelId: string) => void;
  className?: string;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModelId,
  onSelectModel,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeModel =
    SAMPLE_MODELS.find((m) => m.id === selectedModelId) || SAMPLE_MODELS[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={cn("relative inline-block text-left", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Select AI Model: currently ${activeModel.name}`}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md shadow-xs transition-all cursor-pointer select-none"
      >
        <div
          className={cn(
            "w-5 h-5 rounded-lg flex items-center justify-center text-white text-[10px] font-bold bg-gradient-to-br",
            activeModel.iconBg
          )}
        >
          {activeModel.shortName.slice(0, 2)}
        </div>
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
              {activeModel.shortName}
            </span>
            {activeModel.badge && (
              <span className="hidden sm:inline-block px-1.5 py-0.2 text-[9px] font-semibold rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                {activeModel.badge}
              </span>
            )}
          </div>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-slate-400 transition-transform duration-200 ml-1",
            isOpen && "rotate-180 text-indigo-500"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 mt-2 w-72 sm:w-84 max-w-[calc(100vw-2rem)] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 max-h-[80vh] overflow-y-auto"
        >
          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
            <p className="text-xs font-semibold text-slate-900 dark:text-white">Frontier AI Models</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Switch intelligence provider on the fly
            </p>
          </div>

          <div className="space-y-1">
            {SAMPLE_MODELS.map((model) => {
              const isSelected = model.id === activeModel.id;
              return (
                <button
                  key={model.id}
                  role="option"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => {
                    onSelectModel(model.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-start justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer select-none",
                    isSelected
                      ? "bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/60"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-transparent"
                  )}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className={cn(
                        "w-6 h-6 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5 bg-gradient-to-br",
                        model.iconBg
                      )}
                    >
                      {model.shortName.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={cn(
                            "text-xs sm:text-sm font-semibold",
                            isSelected
                              ? "text-indigo-600 dark:text-indigo-400"
                              : "text-slate-900 dark:text-white"
                          )}
                        >
                          {model.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {model.description}
                      </p>

                      {/* Strengths tags */}
                      <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                        {model.strengths.slice(0, 2).map((s, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.2 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 ml-2 mt-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { Modal } from "@/components/common/Modal";
import { SAMPLE_PROMPT_TEMPLATES } from "@/data/prompts";
import { PromptTemplate } from "@/types";
import { Search, Sparkles, Code, Briefcase, FileText, BarChart3, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PromptLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt: (template: PromptTemplate) => void;
}

const CATEGORIES = ["All", "Coding", "Job Search", "Writing", "Analysis", "Productivity"] as const;

export const PromptLibraryModal: React.FC<PromptLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectPrompt,
}) => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = SAMPLE_PROMPT_TEMPLATES.filter((tmpl) => {
    const matchesCategory = activeCategory === "All" || tmpl.category === activeCategory;
    const matchesSearch =
      tmpl.title.toLowerCase().includes(search.toLowerCase()) ||
      tmpl.description.toLowerCase().includes(search.toLowerCase()) ||
      tmpl.prompt.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Coding":
        return <Code className="w-4 h-4 text-emerald-500" />;
      case "Job Search":
        return <Briefcase className="w-4 h-4 text-amber-500" />;
      case "Writing":
        return <FileText className="w-4 h-4 text-indigo-500" />;
      case "Analysis":
        return <BarChart3 className="w-4 h-4 text-purple-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-indigo-500" />;
    }
  };

  const handleUsePrompt = (template: PromptTemplate) => {
    setSelectedId(template.id);
    onSelectPrompt(template);
    setTimeout(() => {
      setSelectedId(null);
      onClose();
    }, 250);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Prompt Template Library"
      description="Select battle-tested prompt templates tailored for coding, job hunting, and writing."
      maxWidth="3xl"
    >
      <div className="space-y-4 pt-2">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates (e.g., Code Review, AppifyDevs Cover Letter, TL;DR)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-lg transition shrink-0 cursor-pointer select-none",
                activeCategory === cat
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-1">
          {filtered.map((tmpl) => {
            const isSelected = selectedId === tmpl.id;
            return (
              <div
                key={tmpl.id}
                onClick={() => handleUsePrompt(tmpl)}
                className={cn(
                  "p-4 rounded-xl border transition-all cursor-pointer select-none flex flex-col justify-between text-left group",
                  isSelected
                    ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500"
                    : "bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md"
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(tmpl.category)}
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {tmpl.title}
                      </h4>
                    </div>
                    {isSelected ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                        {tmpl.category}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {tmpl.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/60 text-[11px] text-slate-400">
                  <span>Suggested: <strong className="text-slate-600 dark:text-slate-300">{tmpl.modelSuggestion || "GPT-4o"}</strong></span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline">
                    Use Template →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

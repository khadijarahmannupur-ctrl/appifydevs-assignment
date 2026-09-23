"use client";

import React, { useState } from "react";
import { SAMPLE_TESTIMONIALS } from "@/data/testimonials";
import { Card } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { SampleDataBadge } from "@/components/common/SampleDataBadge";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export const Testimonials: React.FC = () => {
  const [filterRole, setFilterRole] = useState<string>("All");

  const roles = ["All", "Engineer", "Researcher", "Creator"];

  const filtered = SAMPLE_TESTIMONIALS.filter((t) => {
    if (filterRole === "All") return true;
    return t.role.toLowerCase().includes(filterRole.toLowerCase());
  });

  return (
    <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center space-y-3 mb-10">
        <div className="flex flex-col items-center gap-1.5">
          <Badge variant="purple">Loved by Power Users</Badge>
          <SampleDataBadge variant="subtle" text="Sample user testimonials" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Trusted by Top Engineers & Researchers
        </h2>
        <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Discover how developers leverage EchoGPT to supercharge coding, research, and writing without switching tabs.
        </p>

        {/* Filter Pills */}
        <div className="pt-3 flex items-center justify-center gap-1.5 flex-wrap">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setFilterRole(role)}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition cursor-pointer select-none ${
                filterRole === role
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {role === "All" ? "All Reviews" : `${role}s`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <Card
            key={item.id}
            hoverEffect
            className="p-6 sm:p-7 flex flex-col justify-between space-y-4 relative"
          >
            <div>
              {/* Rating stars & badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{item.badge}</span>
                </span>
              </div>

              {/* Review Quote */}
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic">
                &ldquo;{item.content}&rdquo;
              </p>
            </div>

            {/* Author info */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 shrink-0 relative border border-slate-300 dark:border-slate-700">
                  <Image
                    src={item.avatar}
                    alt={item.author}
                    width={40}
                    height={40}
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {item.author}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {item.role} • <span className="text-slate-500 font-medium">{item.company}</span>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="block text-[9px] text-slate-400 uppercase tracking-wider">Favorite Model:</span>
                <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                  {item.favoriteModel}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

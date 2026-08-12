"use client";

import React from "react";
import { Sparkles } from "lucide-react";

const INSIGHTS = [
  {
    category: "PELUANG",
    categoryColor: "text-brand",
    title: "BMW Seri 5 stok kritis di Jakarta Selatan.",
    description: "Habis dalam 8 hari. Alokasi 4 unit dari Bandung.",
  },
  {
    category: "PERHATIAN",
    categoryColor: "text-amber-500",
    title: "Konversi Porsche turun 6% minggu ini.",
    description: "12 lead stagnan >5 hari milik Rendra & Diva.",
  },
  {
    category: "INSIGHT",
    categoryColor: "text-brand",
    title: "Segmen 35–44 menyumbang 47% revenue Q3.",
    description: "Naik dari 38% di Q2.",
  },
];

export const AiInsightPanel: React.FC = () => {
  return (
    <div className="bg-surfaceLight-card border border-surfaceLight-border p-6 rounded-2xl flex flex-col h-full shadow-xs opacity-100">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <Sparkles className="w-4 h-4 text-brand" strokeWidth={1.5} />
        <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em]">
          AI INSIGHT PANEL
        </span>
      </div>

      {/* Insights List */}
      <div className="flex flex-col gap-4 divide-y divide-surfaceLight-border">
        {INSIGHTS.map((item, idx) => (
          <div key={idx} className={idx > 0 ? "pt-4" : ""}>
            <span className={`text-[11px] font-semibold tracking-[0.08em] uppercase block mb-1 ${item.categoryColor}`}>
              {item.category}
            </span>
            <h4 className="text-[14px] font-semibold text-textGray-display mb-1 leading-snug">
              {item.title}
            </h4>
            <p className="text-[13px] text-textGray-tertiary leading-relaxed font-normal">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiInsightPanel;

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const REVENUE_BAR_DATA = [
  { month: "Jan", fullMonth: "Januari", val: "Rp 28,4 M", shortVal: "28.4M", height: "64%" },
  { month: "Feb", fullMonth: "Februari", val: "Rp 31,2 M", shortVal: "31.2M", height: "71%" },
  { month: "Mar", fullMonth: "Maret", val: "Rp 29,8 M", shortVal: "29.8M", height: "68%" },
  { month: "Apr", fullMonth: "April", val: "Rp 34,5 M", shortVal: "34.5M", height: "79%" },
  { month: "Mei", fullMonth: "Mei", val: "Rp 36,1 M", shortVal: "36.1M", height: "83%" },
  { month: "Jun", fullMonth: "Juni", val: "Rp 38,1 M", shortVal: "38.1M", height: "88%" },
  { month: "Jul", fullMonth: "Juli", val: "Rp 42,8 M", shortVal: "42.8M", height: "100%", active: true },
  { month: "Agu", fullMonth: "Agustus", val: "Rp 39,4 M", shortVal: "39.4M", height: "91%" },
  { month: "Sep", fullMonth: "September", val: "Rp 37,8 M", shortVal: "37.8M", height: "86%" },
  { month: "Okt", fullMonth: "Oktober", val: "Rp 41,2 M", shortVal: "41.2M", height: "95%" },
  { month: "Nov", fullMonth: "November", val: "Rp 35,8 M", shortVal: "35.8M", height: "82%" },
  { month: "Des", fullMonth: "Desember", val: "Rp 40,5 M", shortVal: "40.5M", height: "93%" },
];

export const RevenueTrendChart: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(6);
  const [filterPeriod, setFilterPeriod] = useState<"12Bulan" | "Kuartal">("12Bulan");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.12 }}
      className="bg-surfaceLight-card border border-surfaceLight-border p-6 rounded-2xl flex flex-col justify-between h-full shadow-xs transform-gpu"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
            12 BULAN
          </span>
          <h3 className="text-[18px] font-display font-semibold text-textGray-display">
            Revenue trend
          </h3>
        </div>

        {/* Header Tools: Period Filter & Selected Metric Tooltip */}
        <div className="flex items-center gap-3">
          {hoveredIdx !== null && (
            <div className="text-right hidden xs:block">
              <span className="text-[11px] text-textGray-tertiary font-normal block leading-tight">
                {REVENUE_BAR_DATA[hoveredIdx].fullMonth}
              </span>
              <span className="text-[14px] font-bold text-brand">
                {REVENUE_BAR_DATA[hoveredIdx].val}
              </span>
            </div>
          )}

          <div className="flex items-center gap-1 bg-surfaceLight-pearl border border-surfaceLight-border p-1 rounded-full text-[12px] font-medium text-textGray-secondary">
            <button
              onClick={() => setFilterPeriod("12Bulan")}
              className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                filterPeriod === "12Bulan"
                  ? "bg-surfaceLight-card text-textGray-display shadow-xs font-semibold"
                  : "hover:text-textGray-primary"
              }`}
            >
              12 Bulan
            </button>
            <button
              onClick={() => setFilterPeriod("Kuartal")}
              className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                filterPeriod === "Kuartal"
                  ? "bg-surfaceLight-card text-textGray-display shadow-xs font-semibold"
                  : "hover:text-textGray-primary"
              }`}
            >
              Kuartal
            </button>
          </div>
        </div>
      </div>

      {/* Bar Chart Area matching SalesTrendChart pattern */}
      <div className="flex items-end justify-between gap-1.5 md:gap-2 h-[200px] pt-4 px-1">
        {REVENUE_BAR_DATA.map((bar, idx) => {
          const isSelected = hoveredIdx === idx;

          return (
            <div
              key={bar.month}
              onMouseEnter={() => setHoveredIdx(idx)}
              className="flex-1 flex flex-col items-center gap-2 h-full justify-end cursor-pointer group"
            >
              {/* Tooltip Value */}
              <div
                className={`text-[10px] md:text-[11px] font-semibold transition-opacity duration-150 whitespace-nowrap ${
                  isSelected
                    ? "opacity-100 text-textGray-display font-bold"
                    : "opacity-0 group-hover:opacity-100 text-textGray-tertiary"
                }`}
              >
                {bar.shortVal}
              </div>

              {/* Bar Track & Gradient Fill (Identical to SalesTrendChart) */}
              <div className="w-full max-w-[32px] bg-surfaceLight-pearl border border-surfaceLight-border rounded-t-xl h-full flex items-end p-0.5 overflow-hidden">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: bar.height }}
                  transition={{ type: "spring", stiffness: 280, damping: 22, delay: 0.1 + idx * 0.02 }}
                  className={`w-full rounded-t-lg transition-all duration-300 transform-gpu ${
                    isSelected
                      ? "bg-gradient-to-t from-[#2A5230] via-[#4B8E55] to-[#6BA374] opacity-100 scale-y-[1.02] shadow-sm"
                      : "bg-gradient-to-t from-[#2A5230]/75 via-[#4B8E55]/75 to-[#6BA374]/75 opacity-80 group-hover:opacity-100"
                  }`}
                />
              </div>

              {/* Month Label */}
              <span
                className={`text-[11px] md:text-[12px] font-medium transition-colors duration-150 ${
                  isSelected ? "text-textGray-display font-semibold" : "text-textGray-tertiary"
                }`}
              >
                {bar.month}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default RevenueTrendChart;

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { salesService, SalesChartBar } from "@/shared/lib/supabase/salesService";

const DEFAULT_MONTHLY_BARS: SalesChartBar[] = [
  { label: "Jan", val: 8, revenueText: "Rp 28.4 M", heightPercent: 62 },
  { label: "Feb", val: 9, revenueText: "Rp 31.2 M", heightPercent: 70 },
  { label: "Mar", val: 8, revenueText: "Rp 29.8 M", heightPercent: 64 },
  { label: "Apr", val: 10, revenueText: "Rp 34.5 M", heightPercent: 78 },
  { label: "Mei", val: 11, revenueText: "Rp 36.1 M", heightPercent: 82 },
  { label: "Jun", val: 11, revenueText: "Rp 38.1 M", heightPercent: 86 },
  { label: "Jul", val: 13, revenueText: "Rp 42.8 M", heightPercent: 100 },
  { label: "Agu", val: 12, revenueText: "Rp 39.4 M", heightPercent: 91 },
  { label: "Sep", val: 11, revenueText: "Rp 37.8 M", heightPercent: 85 },
  { label: "Okt", val: 12, revenueText: "Rp 41.2 M", heightPercent: 94 },
  { label: "Nov", val: 10, revenueText: "Rp 35.8 M", heightPercent: 80 },
  { label: "Des", val: 12, revenueText: "Rp 40.5 M", heightPercent: 92 },
];

export const SalesTrendChart: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [filterPeriod, setFilterPeriod] = useState<"Bulanan" | "Kuartal">("Bulanan");
  const [bars, setBars] = useState<SalesChartBar[]>(DEFAULT_MONTHLY_BARS);

  useEffect(() => {
    salesService.getSalesTrendData(filterPeriod).then((data) => {
      if (data && data.length > 0) {
        setBars(data);
      }
    });
  }, [filterPeriod]);

  return (
    <div className="bg-surfaceLight-card border border-surfaceLight-border p-4 sm:p-6 rounded-2xl flex flex-col justify-between h-full shadow-xs transform-gpu overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
        <div>
          <span className="text-[10px] sm:text-[11px] font-semibold text-textGray-muted uppercase tracking-[0.08em] block mb-1">
            PERFORMA PENJUALAN LIVE DATABASE
          </span>
          <h3 className="text-[18px] font-display font-semibold text-textGray-display leading-tight">
            {filterPeriod === "Bulanan" ? "Tren Penjualan Bulanan 2026" : "Akumulasi Sales Per Kuartal 2026"}
          </h3>
        </div>

        {/* Sliding Filter Pill Controls */}
        <div className="relative flex items-center bg-surfaceLight-pearl border border-surfaceLight-border p-1 rounded-full text-[12px] font-medium text-textGray-secondary shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilterPeriod("Bulanan")}
            className={`relative z-10 px-3 py-1 rounded-full transition-colors cursor-pointer text-[11.5px] sm:text-[12px] font-medium select-none ${
              filterPeriod === "Bulanan"
                ? "text-textGray-display font-semibold"
                : "text-textGray-tertiary hover:text-textGray-primary"
            }`}
          >
            {filterPeriod === "Bulanan" && (
              <motion.div
                layoutId="activeSalesPill"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
                className="absolute inset-0 bg-surfaceLight-card border border-surfaceLight-border rounded-full shadow-xs -z-10"
              />
            )}
            Bulanan
          </button>

          <button
            type="button"
            onClick={() => setFilterPeriod("Kuartal")}
            className={`relative z-10 px-3 py-1 rounded-full transition-colors cursor-pointer text-[11.5px] sm:text-[12px] font-medium select-none ${
              filterPeriod === "Kuartal"
                ? "text-textGray-display font-semibold"
                : "text-textGray-tertiary hover:text-textGray-primary"
            }`}
          >
            {filterPeriod === "Kuartal" && (
              <motion.div
                layoutId="activeSalesPill"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
                className="absolute inset-0 bg-surfaceLight-card border border-surfaceLight-border rounded-full shadow-xs -z-10"
              />
            )}
            Kuartal
          </button>
        </div>
      </div>

      {/* Bar Chart Scrollable Outer Wrapper */}
      <div className="w-full overflow-x-auto no-scrollbar pb-2 pt-2">
        {/* Inner Flex Container with min-w-[540px] to guarantee spacious non-dense bars on mobile */}
        <div
          onMouseLeave={() => setHoveredIdx(null)}
          className="flex items-end justify-between gap-2.5 sm:gap-3 h-[210px] min-w-[540px] sm:min-w-0 px-1"
        >
          <AnimatePresence mode="wait">
            {bars.map((bar, idx) => {
              const isSelected = hoveredIdx === idx;

              return (
                <div
                  key={bar.label}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className="flex-1 flex flex-col items-center gap-1.5 sm:gap-2 h-full justify-end cursor-pointer group relative"
                >
                  {/* Hover Floating Tooltip */}
                  <div
                    className={`absolute -top-7 z-20 px-2.5 py-1 rounded-lg bg-surfaceLight-card border border-surfaceLight-border shadow-md whitespace-nowrap text-center transition-all duration-150 pointer-events-none ${
                      isSelected ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                  >
                    <span className="text-[11px] font-bold text-textGray-display block leading-tight">
                      {bar.val} Unit ({bar.revenueText})
                    </span>
                    {bar.subtitle && (
                      <span className="text-[10px] text-textGray-tertiary font-normal block leading-tight">
                        {bar.subtitle}
                      </span>
                    )}
                  </div>

                  {/* Value Text on top of Bar */}
                  <span className={`text-[11px] font-semibold transition-opacity duration-150 ${isSelected ? "opacity-0" : "opacity-90 text-textGray-tertiary"}`}>
                    {bar.val}
                  </span>

                  {/* Bar Track & Fill */}
                  <div className="w-full max-w-[34px] sm:max-w-[38px] mx-auto bg-surfaceLight-pearl border border-surfaceLight-border rounded-t-xl h-full flex items-end p-0.5 overflow-hidden">
                    <motion.div
                      initial={{ height: `${bar.heightPercent}%` }}
                      animate={{ height: `${bar.heightPercent}%` }}
                      transition={{ type: "spring", stiffness: 300, damping: 26 }}
                      className={`w-full rounded-t-lg transition-all duration-200 transform-gpu ${
                        isSelected
                          ? "bg-gradient-to-t from-[#2A5230] via-[#4B8E55] to-[#6BA374] opacity-100 scale-y-[1.02] shadow-sm"
                          : "bg-gradient-to-t from-[#2A5230]/75 via-[#4B8E55]/75 to-[#6BA374]/75 opacity-80 group-hover:opacity-100"
                      }`}
                    />
                  </div>

                  {/* Label */}
                  <div className="flex flex-col items-center gap-0.5">
                    <span
                      className={`text-[11.5px] sm:text-[12px] font-semibold transition-colors duration-150 ${
                        isSelected ? "text-textGray-display font-bold" : "text-textGray-tertiary"
                      }`}
                    >
                      {bar.label}
                    </span>
                    {filterPeriod === "Kuartal" && bar.subtitle && (
                      <span className="text-[9.5px] sm:text-[10px] text-textGray-muted font-normal">
                        {bar.subtitle}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SalesTrendChart;

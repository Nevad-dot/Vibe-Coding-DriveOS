"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { salesService, SalesChartBar } from "@/shared/lib/supabase/salesService";

export const SalesTrendChart: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [filterPeriod, setFilterPeriod] = useState<"Bulanan" | "Kuartal">("Bulanan");
  const [bars, setBars] = useState<SalesChartBar[]>([]);

  useEffect(() => {
    salesService.getSalesTrendData(filterPeriod).then((data) => {
      setBars(data);
    });
  }, [filterPeriod]);

  return (
    <div className="bg-surfaceLight-card border border-surfaceLight-border p-6 rounded-2xl flex flex-col justify-between h-full shadow-xs transform-gpu">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
            PERFORMA PENJUALAN LIVE DATABASE
          </span>
          <h3 className="text-[18px] font-display font-semibold text-textGray-display">
            {filterPeriod === "Bulanan" ? "Tren Penjualan Bulanan 2026" : "Akumulasi Sales Per Kuartal 2026"}
          </h3>
        </div>

        {/* Sliding Filter Pill Controls */}
        <div className="relative flex items-center bg-surfaceLight-pearl border border-surfaceLight-border p-1 rounded-full text-[12px] font-medium text-textGray-secondary">
          <button
            type="button"
            onClick={() => setFilterPeriod("Bulanan")}
            className={`relative z-10 px-3.5 py-1 rounded-full transition-colors cursor-pointer text-[12px] font-medium select-none ${
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
            className={`relative z-10 px-3.5 py-1 rounded-full transition-colors cursor-pointer text-[12px] font-medium select-none ${
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

      {/* Bar Chart Area */}
      <div
        onMouseLeave={() => setHoveredIdx(null)}
        className="flex items-end justify-between gap-2 h-[210px] pt-6 px-1"
      >
        <AnimatePresence mode="wait">
          {bars.map((bar, idx) => {
            const isSelected = hoveredIdx === idx;

            return (
              <div
                key={bar.label}
                onMouseEnter={() => setHoveredIdx(idx)}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end cursor-pointer group relative"
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

                {/* Value Text when not hovering */}
                <span className={`text-[11px] font-semibold transition-opacity duration-150 ${isSelected ? "opacity-0" : "opacity-90 text-textGray-tertiary"}`}>
                  {bar.val}
                </span>

                {/* Bar Track & Fill */}
                <div className="w-full max-w-[36px] mx-auto bg-surfaceLight-pearl border border-surfaceLight-border rounded-t-xl h-full flex items-end p-0.5 overflow-hidden">
                  <motion.div
                    initial={{ height: "0%" }}
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
                    className={`text-[12px] font-medium transition-colors duration-150 ${
                      isSelected ? "text-textGray-display font-bold" : "text-textGray-tertiary"
                    }`}
                  >
                    {bar.label}
                  </span>
                  {filterPeriod === "Kuartal" && bar.subtitle && (
                    <span className="text-[10px] text-textGray-muted font-normal">
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
  );
};

export default SalesTrendChart;

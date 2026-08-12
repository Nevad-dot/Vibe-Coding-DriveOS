"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { salesService, SalesChartBar } from "@/shared/lib/supabase/salesService";
import { formatCurrencyValue } from "@/shared/lib/settingsStore";

export const RevenueTrendChart: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [filterPeriod, setFilterPeriod] = useState<"12Bulan" | "Kuartal">("12Bulan");
  const [bars, setBars] = useState<SalesChartBar[]>([]);
  const [, setRefreshTick] = useState(0);

  useEffect(() => {
    const periodKey = filterPeriod === "12Bulan" ? "Bulanan" : "Kuartal";
    salesService.getSalesTrendData(periodKey).then((data) => {
      setBars(data);
    });

    const handleSettingsChange = () => {
      setRefreshTick((prev) => prev + 1);
    };
    window.addEventListener("driveos-settings-changed", handleSettingsChange);
    return () => window.removeEventListener("driveos-settings-changed", handleSettingsChange);
  }, [filterPeriod]);

  const activeBar = hoveredIdx !== null && bars[hoveredIdx] ? bars[hoveredIdx] : null;

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
            PERFORMA REVENUE LIVE DATABASE
          </span>
          <h3 className="text-[18px] font-display font-semibold text-textGray-display">
            {filterPeriod === "12Bulan" ? "Revenue Trend 12 Bulan 2026" : "Revenue Trend Per Kuartal 2026"}
          </h3>
        </div>

        {/* Header Tools: Period Filter & Selected Metric Tooltip */}
        <div className="flex items-center gap-3">
          {activeBar ? (
            <div className="text-right hidden xs:block">
              <span className="text-[11px] text-textGray-tertiary font-normal block leading-tight">
                {activeBar.subtitle || activeBar.label}
              </span>
              <span className="text-[14px] font-bold text-brand">
                {formatCurrencyValue(activeBar.revenueText)}
              </span>
            </div>
          ) : (
            <div className="text-right hidden xs:block opacity-0">
              <span className="text-[11px] font-normal block leading-tight">Total</span>
              <span className="text-[14px] font-bold">Rp 0</span>
            </div>
          )}

          {/* Sliding Filter Pill Controls */}
          <div className="relative flex items-center bg-surfaceLight-pearl border border-surfaceLight-border p-1 rounded-full text-[12px] font-medium text-textGray-secondary">
            <button
              type="button"
              onClick={() => setFilterPeriod("12Bulan")}
              className={`relative z-10 px-3.5 py-1 rounded-full transition-colors cursor-pointer text-[12px] font-medium select-none ${
                filterPeriod === "12Bulan"
                  ? "text-textGray-display font-semibold"
                  : "text-textGray-tertiary hover:text-textGray-primary"
              }`}
            >
              {filterPeriod === "12Bulan" && (
                <motion.div
                  layoutId="activeRevenuePill"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  className="absolute inset-0 bg-surfaceLight-card border border-surfaceLight-border rounded-full shadow-xs -z-10"
                />
              )}
              12 Bulan
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
                  layoutId="activeRevenuePill"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  className="absolute inset-0 bg-surfaceLight-card border border-surfaceLight-border rounded-full shadow-xs -z-10"
                />
              )}
              Kuartal
            </button>
          </div>
        </div>
      </div>

      {/* Bar Chart Area */}
      <div
        onMouseLeave={() => setHoveredIdx(null)}
        className="flex items-end justify-between gap-1.5 md:gap-2 h-[210px] pt-4 px-1"
      >
        <AnimatePresence mode="wait">
          {bars.map((bar, idx) => {
            const isSelected = hoveredIdx === idx;
            const formattedRev = formatCurrencyValue(bar.revenueText);

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
                    {formattedRev} ({bar.val} SPK Unit)
                  </span>
                  {bar.subtitle && (
                    <span className="text-[10px] text-textGray-tertiary font-normal block leading-tight">
                      {bar.subtitle}
                    </span>
                  )}
                </div>

                {/* Short Value Text on top of Bar */}
                <span className={`text-[10.5px] font-semibold transition-opacity duration-150 whitespace-nowrap ${isSelected ? "opacity-0" : "opacity-85 text-textGray-tertiary"}`}>
                  {formattedRev.replace("Rp ", "").replace("USD ", "$")}
                </span>

                {/* Bar Track & Gradient Fill */}
                <div className="w-full max-w-[28px] md:max-w-[32px] mx-auto bg-surfaceLight-pearl border border-surfaceLight-border rounded-t-xl h-full flex items-end p-0.5 overflow-hidden">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${bar.heightPercent}%` }}
                    transition={{ type: "spring", stiffness: 280, damping: 22, delay: 0.05 + idx * 0.02 }}
                    className={`w-full rounded-t-lg transition-all duration-300 transform-gpu ${
                      isSelected
                        ? "bg-gradient-to-t from-[#2A5230] via-[#4B8E55] to-[#6BA374] opacity-100 scale-y-[1.02] shadow-sm"
                        : "bg-gradient-to-t from-[#2A5230]/75 via-[#4B8E55]/75 to-[#6BA374]/75 opacity-80 group-hover:opacity-100"
                    }`}
                  />
                </div>

                {/* Month/Quarter Label */}
                <div className="flex flex-col items-center gap-0.5">
                  <span
                    className={`text-[11px] md:text-[12px] font-medium transition-colors duration-150 ${
                      isSelected ? "text-textGray-display font-semibold" : "text-textGray-tertiary"
                    }`}
                  >
                    {bar.label}
                  </span>
                </div>
              </div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default RevenueTrendChart;

"use client";

import React, { useState } from "react";

const BAR_DATA = [
  { month: "Jan", val: 32, height: "45%" },
  { month: "Feb", val: 38, height: "55%" },
  { month: "Mar", val: 42, height: "62%" },
  { month: "Apr", val: 35, height: "50%" },
  { month: "Mei", val: 48, height: "72%" },
  { month: "Jun", val: 56, height: "85%" },
  { month: "Jul", val: 64, height: "98%", active: true },
];

export const SalesTrendChart: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(6);

  return (
    <div className="bg-surfaceLight-card border border-surfaceLight-border p-6 rounded-2xl flex flex-col justify-between h-full shadow-xs transform-gpu">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
            PERFORMA PENJUALAN
          </span>
          <h3 className="text-[18px] font-display font-semibold text-textGray-display">
            Tren Penjualan 2026
          </h3>
        </div>

        <div className="flex items-center gap-1.5 bg-surfaceLight-pearl border border-surfaceLight-border p-1 rounded-full text-[12px] font-medium text-textGray-secondary">
          <button className="px-3 py-1 rounded-full bg-surfaceLight-card text-textGray-display shadow-xs">
            Bulanan
          </button>
          <button className="px-3 py-1 rounded-full hover:text-textGray-primary transition-colors">
            Kuartal
          </button>
        </div>
      </div>

      {/* Bar Chart Area */}
      <div className="flex items-end justify-between gap-3 h-[200px] pt-4 px-2">
        {BAR_DATA.map((bar, idx) => {
          const isSelected = hoveredIdx === idx;

          return (
            <div
              key={bar.month}
              onMouseEnter={() => setHoveredIdx(idx)}
              className="flex-1 flex flex-col items-center gap-2 h-full justify-end cursor-pointer group"
            >
              {/* Tooltip Value */}
              <div
                className={`text-[11px] font-semibold transition-opacity duration-150 ${
                  isSelected ? "opacity-100 text-textGray-display" : "opacity-0 group-hover:opacity-100 text-textGray-tertiary"
                }`}
              >
                {bar.val}
              </div>

              {/* Bar Track & Gradient Fill (Native CSS GPU Transitions) */}
              <div className="w-full max-w-[36px] bg-surfaceLight-pearl border border-surfaceLight-border rounded-t-xl h-full flex items-end p-0.5 overflow-hidden">
                <div
                  style={{ height: bar.height }}
                  className={`w-full rounded-t-lg transition-all duration-300 transform-gpu ${
                    isSelected
                      ? "bg-gradient-to-t from-[#2A5230] via-[#4B8E55] to-[#6BA374] opacity-100 scale-y-[1.02] shadow-sm"
                      : "bg-gradient-to-t from-[#2A5230]/75 via-[#4B8E55]/75 to-[#6BA374]/75 opacity-80 group-hover:opacity-100"
                  }`}
                />
              </div>

              {/* Month Label */}
              <span className={`text-[12px] font-medium transition-colors duration-150 ${isSelected ? "text-textGray-display font-semibold" : "text-textGray-tertiary"}`}>
                {bar.month}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SalesTrendChart;

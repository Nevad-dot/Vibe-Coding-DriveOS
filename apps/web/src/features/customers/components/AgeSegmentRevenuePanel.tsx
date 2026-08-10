"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const SEGMENTS = [
  { label: "35–44 thn", fullLabel: "35–44 tahun", percent: 47, val: "47%", color: "#4B8E55", stroke: "#4B8E55" },
  { label: "25–34 thn", fullLabel: "25–34 tahun", percent: 22, val: "22%", color: "#33613A", stroke: "#33613A" },
  { label: "45–54 thn", fullLabel: "45–54 tahun", percent: 21, val: "21%", color: "#6BA374", stroke: "#6BA374" },
  { label: "55+ thn", fullLabel: "55+ tahun", percent: 10, val: "10%", color: "#8EBE97", stroke: "#8EBE97" },
];

export const AgeSegmentRevenuePanel: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // SVG Donut calculation
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercent = 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.15 }}
      className="bg-surfaceLight-card border border-surfaceLight-border p-6 rounded-2xl flex flex-col shadow-xs"
    >
      {/* Header */}
      <div>
        <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
          SEGMEN USIA
        </span>
        <h3 className="text-[18px] font-display font-semibold text-textGray-display">
          Distribusi revenue
        </h3>
      </div>

      {/* Donut Circular Graph + Compact Legend Breakdown */}
      <div className="mt-5 flex flex-col sm:flex-row items-center gap-6 md:gap-8">
        {/* Left Side: Static SVG Donut Chart (pointer-events-none: graph ignores direct hover) */}
        <div className="relative w-[130px] h-[130px] flex items-center justify-center shrink-0 pointer-events-none select-none">
          <svg className="w-full h-full -rotate-90 transform-gpu" viewBox="0 0 130 130">
            {/* Background Ring Track */}
            <circle
              cx="65"
              cy="65"
              r={radius}
              className="stroke-surfaceLight-pearl"
              strokeWidth="12"
              fill="transparent"
            />

            {/* Donut Segments */}
            {SEGMENTS.map((seg, idx) => {
              const strokeDashoffset = circumference - (seg.percent / 100) * circumference;
              const rotation = (accumulatedPercent / 100) * 360;
              accumulatedPercent += seg.percent;

              const isHovered = hoveredIdx === idx;

              return (
                <motion.circle
                  key={seg.label}
                  cx="65"
                  cy="65"
                  r={radius}
                  stroke={seg.stroke}
                  strokeWidth={isHovered ? "16" : "12"}
                  fill="transparent"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ type: "spring", stiffness: 220, damping: 24, delay: 0.2 + idx * 0.08 }}
                  style={{
                    transformOrigin: "65px 65px",
                    transform: `rotate(${rotation}deg)`,
                  }}
                  className="transition-all duration-200"
                />
              );
            })}
          </svg>

          {/* Center Donut Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none select-none">
            <span className="text-[20px] font-bold text-textGray-display leading-none">
              {hoveredIdx !== null ? SEGMENTS[hoveredIdx].val : "47%"}
            </span>
            <span className="text-[10.5px] text-textGray-tertiary font-medium mt-1">
              {hoveredIdx !== null ? SEGMENTS[hoveredIdx].label : "35–44 thn"}
            </span>
          </div>
        </div>

        {/* Right Side: Compact Legend Breakdown (Hovering titles triggers segment selection) */}
        <div className="flex-1 flex flex-col gap-1.5 w-full">
          {SEGMENTS.map((seg, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={seg.label}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer ${
                  isHovered ? "bg-surfaceLight-pearl/80" : "hover:bg-surfaceLight-pearl/40"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span className="text-[13px] font-normal text-textGray-primary">
                    {seg.fullLabel}
                  </span>
                </div>

                <span className="text-[13px] font-semibold text-textGray-display">
                  {seg.val}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default AgeSegmentRevenuePanel;

"use client";

import React from "react";
import { motion } from "framer-motion";

const AGE_SEGMENTS = [
  { segment: "25–34 tahun", percent: "22%", fillWidth: "22%" },
  { segment: "35–44 tahun", percent: "47%", fillWidth: "47%" },
  { segment: "45–54 tahun", percent: "21%", fillWidth: "21%" },
  { segment: "55+ tahun", percent: "10%", fillWidth: "10%" },
];

export const AgeSegmentRevenuePanel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.15 }}
      className="bg-surfaceLight-card border border-surfaceLight-border p-6 rounded-2xl flex flex-col justify-between h-full shadow-xs"
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

      {/* Segment Level Progress Bars with Brand Green Gradient Fill */}
      <div className="flex flex-col justify-between flex-1 pt-6 pb-2 gap-6">
        {AGE_SEGMENTS.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-[13.5px]">
              <span className="text-textGray-primary font-normal">{item.segment}</span>
              <span className="text-textGray-tertiary font-normal">{item.percent}</span>
            </div>

            {/* Level Progress Bar Container */}
            <div className="w-full h-2 bg-surfaceLight-pearl border border-surfaceLight-border rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: item.fillWidth }}
                transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.25 + idx * 0.05 }}
                className="h-full bg-gradient-to-r from-[#33613A] via-[#4B8E55] to-[#6BA374] rounded-full shadow-xs"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AgeSegmentRevenuePanel;

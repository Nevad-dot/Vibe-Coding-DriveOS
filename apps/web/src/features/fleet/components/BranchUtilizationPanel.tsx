"use client";

import React from "react";
import { motion } from "framer-motion";

const LOCATIONS = [
  { branch: "Jakarta Pusat", percent: "92%", fillWidth: "92%", color: "bg-gradient-to-r from-[#33613A] via-[#4B8E55] to-[#6BA374]" },
  { branch: "Jakarta Selatan", percent: "88%", fillWidth: "88%", color: "bg-gradient-to-r from-[#33613A] via-[#4B8E55] to-[#6BA374]" },
  { branch: "Bandung", percent: "78%", fillWidth: "78%", color: "bg-gradient-to-r from-[#33613A] via-[#4B8E55] to-[#6BA374]" },
  { branch: "Surabaya", percent: "84%", fillWidth: "84%", color: "bg-gradient-to-r from-[#33613A] via-[#4B8E55] to-[#6BA374]" },
  { branch: "Bali", percent: "71%", fillWidth: "71%", color: "bg-gradient-to-r from-[#33613A] via-[#4B8E55] to-[#6BA374]" },
  { branch: "Medan", percent: "66%", fillWidth: "66%", color: "bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500" },
];

export const BranchUtilizationPanel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.2 }}
      className="bg-surfaceLight-card border border-surfaceLight-border p-6 rounded-2xl flex flex-col h-full shadow-xs"
    >
      {/* Header */}
      <div className="mb-4">
        <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
          CABANG
        </span>
        <h3 className="text-[18px] font-display font-semibold text-textGray-display">
          Utilization per lokasi
        </h3>
      </div>

      {/* Location Level Progress Bars */}
      <div className="flex flex-col gap-3.5">
        {LOCATIONS.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-textGray-primary font-normal">{item.branch}</span>
              <span className="text-textGray-tertiary font-normal">{item.percent}</span>
            </div>

            {/* Level Bar Track */}
            <div className="w-full h-2 bg-[#E9EAEB] dark:bg-[#272A34] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: item.fillWidth }}
                transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 + idx * 0.04 }}
                className={`h-full ${item.color} rounded-full shadow-xs`}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BranchUtilizationPanel;

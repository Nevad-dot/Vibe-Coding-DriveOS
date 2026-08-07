"use client";

import React from "react";
import { motion } from "framer-motion";

const FUNNEL_STAGES = [
  { stage: "Inkuiri & Inquiry Baru", count: "214 lead", fillWidth: "100%" },
  { stage: "Test Drive & Showroom Visit", count: "142 lead", fillWidth: "66%" },
  { stage: "Pengajuan SPK & Deal Draft", count: "86 lead", fillWidth: "40%" },
  { stage: "Persetujuan Leasing / Cash", count: "54 lead", fillWidth: "25%" },
  { stage: "Delivery & Serah Terima", count: "38 unit", fillWidth: "18%" },
];

export const SalesFunnelPanel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.15 }}
      className="bg-surfaceLight-card border border-surfaceLight-border p-6 rounded-2xl flex flex-col justify-between h-full shadow-xs"
    >
      {/* Header */}
      <div className="mb-6">
        <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
          SALES FUNNEL CONVERSION
        </span>
        <h3 className="text-[18px] font-display font-semibold text-textGray-display">
          Tahapan Funnel Penjualan
        </h3>
      </div>

      {/* Funnel Level Progress Bars with Brand Green Gradient Fill */}
      <div className="flex flex-col gap-5">
        {FUNNEL_STAGES.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-[13.5px]">
              <span className="text-textGray-primary font-medium">{item.stage}</span>
              <span className="text-textGray-tertiary font-normal">{item.count}</span>
            </div>

            {/* Level Bar Container */}
            <div className="w-full h-2.5 bg-surfaceLight-pearl border border-surfaceLight-border rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: item.fillWidth }}
                transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 + idx * 0.05 }}
                className="h-full bg-gradient-to-r from-[#33613A] via-[#4B8E55] to-[#6BA374] rounded-full shadow-xs"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SalesFunnelPanel;

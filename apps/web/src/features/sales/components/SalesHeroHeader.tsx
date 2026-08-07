"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Plus } from "lucide-react";

export const SalesHeroHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 360, damping: 26 }}
      className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-1"
    >
      {/* Title & Subtitle Stack */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em]">
          SALES INTELLIGENCE
        </span>

        <h1 className="text-[28px] md:text-[34px] font-display tracking-tight leading-snug">
          <span className="font-semibold text-textGray-display">Pipeline yang </span>
          <span className="font-bold text-green-gradient">bergerak.</span>
        </h1>

        <p className="text-[14px] md:text-[15px] text-textGray-tertiary font-normal">
          128 unit closed month-to-date · 214 lead aktif · 38 hot lead siap closing.
        </p>
      </div>

      {/* Action Buttons Stack */}
      <div className="flex items-center gap-3 shrink-0 pt-1 md:pt-0">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="px-4 py-2.5 rounded-full border border-surfaceLight-border text-textGray-primary font-medium text-[13.5px] inline-flex items-center gap-1.5 hover:bg-surfaceLight-pearl transition-colors shadow-xs"
        >
          <span>Export CSV</span>
          <ChevronRight className="w-4 h-4 text-textGray-tertiary" strokeWidth={1.5} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="px-6 py-2.5 rounded-full bg-green-gradient-pill text-white font-medium text-[13.5px] inline-flex items-center justify-center gap-2 transition-colors shadow-xs whitespace-nowrap"
        >
          <Plus className="w-4 h-4 shrink-0" strokeWidth={1.5} />
          <span>New Deal</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SalesHeroHeader;

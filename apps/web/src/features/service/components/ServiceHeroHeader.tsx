"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wrench } from "lucide-react";

export const ServiceHeroHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 360, damping: 26 }}
      className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-1"
    >
      {/* Title & Subtitle */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em]">
          SERVICE MANAGEMENT
        </span>

        <h1 className="text-[28px] md:text-[34px] font-display tracking-tight leading-snug">
          <span className="font-semibold text-textGray-display">18 bay aktif </span>
          <span className="font-bold text-green-gradient">dari 24.</span>
        </h1>

        <p className="text-[14px] md:text-[15px] text-textGray-tertiary font-normal">
          6 job selesai hari ini · 1 overdue · rata-rata cycle 2h 14m.
        </p>
      </div>

      {/* Action Button (Static) */}
      <div className="pt-1 md:pt-0 shrink-0">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="px-6 py-2.5 rounded-full bg-green-gradient-pill text-white font-medium text-[13.5px] inline-flex items-center justify-center gap-2 transition-colors shadow-xs whitespace-nowrap"
        >
          <Wrench className="w-4 h-4 shrink-0" strokeWidth={1.5} />
          <span>Jadwalkan Service</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ServiceHeroHeader;

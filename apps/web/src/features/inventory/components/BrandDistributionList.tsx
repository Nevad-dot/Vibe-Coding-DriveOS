"use client";

import React from "react";
import { motion } from "framer-motion";

const BRANDS = [
  { brand: "BMW", units: "78 unit", percentage: 23, width: "78%" },
  { brand: "Mercedes-Benz", units: "72 unit", percentage: 21, width: "72%" },
  { brand: "Audi", units: "58 unit", percentage: 17, width: "58%" },
  { brand: "Porsche", units: "44 unit", percentage: 13, width: "44%" },
  { brand: "Tesla", units: "32 unit", percentage: 9, width: "32%" },
  { brand: "Ferrari", units: "12 unit", percentage: 4, width: "12%" },
];

export const BrandDistributionList: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.15 }}
      className="bg-surfaceLight-card border border-surfaceLight-border p-6 rounded-2xl flex flex-col h-full shadow-xs"
    >
      {/* Header */}
      <div className="mb-5">
        <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
          DISTRIBUSI BRAND
        </span>
        <h3 className="text-[18px] font-display font-semibold text-textGray-display">
          Distribusi 6 brand
        </h3>
      </div>

      {/* Brand Stock Level Progress Bars */}
      <div className="flex-1 flex flex-col justify-between gap-4">
        {BRANDS.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[13px]">
              <span className="font-semibold text-textGray-display">{item.brand}</span>
              <span className="text-textGray-tertiary font-normal">{item.units}</span>
            </div>

            {/* Level Bar Container */}
            <div className="w-full h-2 bg-[#E9EAEB] dark:bg-[#272A34] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: item.width }}
                transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 + idx * 0.04 }}
                className="h-full bg-gradient-to-r from-[#33613A] via-[#4B8E55] to-[#6BA374] rounded-full shadow-xs"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BrandDistributionList;

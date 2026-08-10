"use client";

import React from "react";
import { motion } from "framer-motion";

const LEFT_BRANDS = [
  {
    brand: "BMW",
    units: "34 unit",
    revenue: "Rp 12,4 M",
    fillWidth: "92%",
  },
  {
    brand: "Porsche",
    units: "12 unit",
    revenue: "Rp 9,2 M",
    fillWidth: "68%",
  },
  {
    brand: "Ferrari",
    units: "3 unit",
    revenue: "Rp 3,4 M",
    fillWidth: "25%",
  },
];

const RIGHT_BRANDS = [
  {
    brand: "Mercedes-Benz",
    units: "28 unit",
    revenue: "Rp 10,8 M",
    fillWidth: "80%",
  },
  {
    brand: "Audi",
    units: "22 unit",
    revenue: "Rp 6,1 M",
    fillWidth: "48%",
  },
  {
    brand: "Tesla",
    units: "9 unit",
    revenue: "Rp 2,9 M",
    fillWidth: "20%",
  },
];

interface BrandCardProps {
  brand: string;
  units: string;
  revenue: string;
  fillWidth: string;
  delayIndex: number;
}

const BrandCardItem: React.FC<BrandCardProps> = ({
  brand,
  units,
  revenue,
  fillWidth,
  delayIndex,
}) => {
  return (
    <div className="flex flex-col gap-2 py-3 border-b border-[#272A34] last:border-b-0">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <h4 className="text-[15px] font-bold text-textGray-display">{brand}</h4>
        <span className="text-[12px] text-textGray-tertiary font-normal">{units}</span>
      </div>

      {/* Sleek Dark Track (bg-[#272A34] - never white) */}
      <div className="w-full h-2 bg-surfaceLight-pearl rounded-full overflow-hidden my-1">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: fillWidth }}
          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 + delayIndex * 0.04 }}
          className="h-full bg-gradient-to-r from-[#33613A] via-[#4B8E55] to-[#6BA374] rounded-full shadow-xs"
        />
      </div>

      {/* Subtext MTD Row */}
      <div className="flex items-center justify-between text-[12px] pt-0.5">
        <span className="text-textGray-tertiary font-normal">Revenue MTD</span>
        <span className="text-textGray-display font-semibold">{revenue}</span>
      </div>
    </div>
  );
};

export const BrandPerformancePanel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.16 }}
      className="bg-surfaceLight-card border border-surfaceLight-border p-6 rounded-2xl flex flex-col shadow-xs"
    >
      {/* Section Header */}
      <div className="mb-6">
        <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
          BRAND PERFORMANCE
        </span>
        <h3 className="text-[22px] md:text-[26px] font-display font-semibold text-textGray-display tracking-tight">
          6 brand · satu leaderboard.
        </h3>
      </div>

      {/* 2-Column Leaderboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {/* Left Column */}
        <div className="flex flex-col gap-3">
          {LEFT_BRANDS.map((item, idx) => (
            <BrandCardItem
              key={item.brand}
              brand={item.brand}
              units={item.units}
              revenue={item.revenue}
              fillWidth={item.fillWidth}
              delayIndex={idx}
            />
          ))}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-3">
          {RIGHT_BRANDS.map((item, idx) => (
            <BrandCardItem
              key={item.brand}
              brand={item.brand}
              units={item.units}
              revenue={item.revenue}
              fillWidth={item.fillWidth}
              delayIndex={idx + 3}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BrandPerformancePanel;

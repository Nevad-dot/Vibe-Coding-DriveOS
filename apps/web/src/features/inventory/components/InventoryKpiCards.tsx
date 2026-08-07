"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const INVENTORY_KPIS = [
  {
    title: "INVENTORY VALUE",
    value: "Rp 1,42 T",
    change: "+3.4%",
    isPositive: true,
    subtitle: "mark-to-market",
  },
  {
    title: "AVG DAYS ON LOT",
    value: "34",
    change: "-5.1%",
    isPositive: true,
    subtitle: "lebih cepat terjual",
  },
  {
    title: "TURNOVER RATE",
    value: "2,8x",
    change: "+4.2%",
    isPositive: true,
    subtitle: "tahunan",
  },
  {
    title: "IDLE UNITS",
    value: "7",
    change: "-40%",
    isPositive: true,
    subtitle: "vs bulan lalu",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.93, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 360, damping: 26 },
  },
};

export const InventoryKpiCards: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
    >
      {INVENTORY_KPIS.map((kpi) => (
        <motion.div
          key={kpi.title}
          variants={cardVariants}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="bg-surfaceLight-card border border-surfaceLight-border p-5 rounded-2xl flex flex-col justify-between shadow-xs hover:border-brand/40 transition-colors"
        >
          <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] mb-2">
            {kpi.title}
          </span>
          <div className="text-[30px] font-display font-semibold text-textGray-display mb-3">
            {kpi.value}
          </div>

          <div className="flex items-center justify-between text-[12px]">
            <div
              className={`inline-flex items-center gap-1 font-medium px-2 py-0.5 rounded-full ${
                kpi.isPositive
                  ? "bg-brand/15 text-brand"
                  : "bg-red-500/15 text-red-500"
              }`}
            >
              {kpi.isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              )}
              <span>{kpi.change}</span>
            </div>
            <span className="text-textGray-tertiary font-normal">{kpi.subtitle}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default InventoryKpiCards;

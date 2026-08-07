"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const METRICS = [
  {
    title: "REVENUE MTD",
    value: "Rp 42,8 M",
    change: "+12.4%",
    isPositive: true,
    subtitle: "vs bulan lalu",
  },
  {
    title: "UNIT TERJUAL",
    value: "128",
    change: "+8.1%",
    isPositive: true,
    subtitle: "vs periode sama",
  },
  {
    title: "KONVERSI LEAD",
    value: "24,6%",
    change: "-1.8%",
    isPositive: false,
    subtitle: "7 hari terakhir",
  },
  {
    title: "FLEET UTILIZATION",
    value: "82%",
    change: "+5.2%",
    isPositive: true,
    subtitle: "idle turun 12 unit",
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

export const MetricsGrid: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
    >
      {METRICS.map((metric) => (
        <motion.div
          key={metric.title}
          variants={cardVariants}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="bg-surfaceLight-card border border-surfaceLight-border p-5 rounded-2xl flex flex-col justify-between shadow-xs hover:border-brand/40 transition-colors"
        >
          <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] mb-2">
            {metric.title}
          </span>
          <div className="text-[30px] font-display font-semibold text-textGray-display mb-3">
            {metric.value}
          </div>

          <div className="flex items-center justify-between text-[12px]">
            <div
              className={`inline-flex items-center gap-1 font-medium px-2 py-0.5 rounded-full ${
                metric.isPositive
                  ? "bg-brand/15 text-brand"
                  : "bg-red-500/15 text-red-500"
              }`}
            >
              {metric.isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              )}
              <span>{metric.change}</span>
            </div>
            <span className="text-textGray-tertiary font-normal">{metric.subtitle}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MetricsGrid;

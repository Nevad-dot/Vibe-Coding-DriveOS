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

export const MetricsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {METRICS.map((metric) => (
        <motion.div
          key={metric.title}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="bg-surfaceLight-card border border-surfaceLight-border p-4 sm:p-5 rounded-2xl flex flex-col justify-between shadow-xs hover:border-brand/40 transition-colors opacity-100 min-w-0"
        >
          <span className="text-[10px] sm:text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] mb-2 truncate">
            {metric.title}
          </span>
          <div className="text-[24px] sm:text-[30px] font-display font-semibold text-textGray-display mb-3 truncate">
            {metric.value}
          </div>

          <div className="flex items-center justify-between text-[11.5px] sm:text-[12px] gap-1">
            <div
              className={`inline-flex items-center gap-1 font-medium px-2 py-0.5 rounded-full shrink-0 ${
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
            <span className="text-textGray-tertiary font-normal truncate">{metric.subtitle}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MetricsGrid;

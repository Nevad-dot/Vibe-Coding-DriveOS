"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const SERVICE_METRICS = [
  {
    title: "BAY UTILIZATION",
    value: "75%",
    change: "+3.4%",
    isPositive: true,
    subtitle: "18/24 bay",
  },
  {
    title: "JOBS HARI INI",
    value: "14",
    change: "+16.6%",
    isPositive: true,
    subtitle: "6 selesai",
  },
  {
    title: "AVG CYCLE TIME",
    value: "2h 14m",
    change: "-8.1%",
    isPositive: false,
    subtitle: "lebih cepat",
  },
  {
    title: "CSAT SERVICE",
    value: "4,7",
    change: "+2.4%",
    isPositive: true,
    subtitle: "dari 5,0",
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

export const ServiceMetricsGrid: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
    >
      {SERVICE_METRICS.map((metric) => {
        const isNegative = !metric.isPositive;

        return (
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
                  isNegative
                    ? "bg-red-500/10 text-red-500"
                    : "bg-brand/15 text-brand"
                }`}
              >
                {isNegative ? (
                  <ArrowDownRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                ) : (
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                )}
                <span>{metric.change}</span>
              </div>
              <span className="text-textGray-tertiary font-normal">{metric.subtitle}</span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ServiceMetricsGrid;

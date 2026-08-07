"use client";

import React from "react";
import { motion } from "framer-motion";
import { Package, Box, AlertTriangle, TrendingDown } from "lucide-react";

const STATUS_CARDS = [
  {
    title: "TOTAL STOCK",
    value: "342",
    subtitle: "unit siap jual",
    icon: Package,
  },
  {
    title: "RESERVED",
    value: "48",
    subtitle: "menunggu delivery",
    icon: Box,
  },
  {
    title: "LOW STOCK",
    value: "12",
    subtitle: "butuh restock",
    icon: AlertTriangle,
  },
  {
    title: "AGING >90D",
    value: "7",
    subtitle: "pertimbangkan diskon",
    icon: TrendingDown,
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

export const InventoryStatusCards: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
    >
      {STATUS_CARDS.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            variants={cardVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="bg-surfaceLight-card border border-surfaceLight-border p-5 rounded-2xl flex flex-col justify-between shadow-xs hover:border-brand/40 transition-colors"
          >
            {/* Top Icon Circle */}
            <div className="w-8 h-8 rounded-full bg-surfaceLight-pearl border border-surfaceLight-border flex items-center justify-center text-textGray-secondary mb-3">
              <Icon className="w-4 h-4 text-textGray-tertiary" strokeWidth={1.5} />
            </div>

            {/* Label & Value */}
            <div>
              <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
                {card.title}
              </span>
              <div className="text-[32px] font-display font-semibold text-textGray-display mb-1 leading-none">
                {card.value}
              </div>
              <span className="text-[12px] text-textGray-tertiary font-normal block">
                {card.subtitle}
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default InventoryStatusCards;

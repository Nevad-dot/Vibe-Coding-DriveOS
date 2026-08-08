"use client";

import React from "react";
import { motion } from "framer-motion";

const CRITICAL_ITEMS = [
  {
    model: "BMW Seri 5 520i M Sport",
    vin: "VIN · WBA5130091",
    status: "Restock",
    statusColor: "bg-gradient-to-r from-[#33613A] via-[#4B8E55] to-[#6BA374] text-white shadow-xs",
    stock: "1 unit (Tersisa)",
  },
  {
    model: "Mercedes-Benz E 200 Avantgarde",
    vin: "VIN · W1K2130421",
    status: "Monitor",
    statusColor: "bg-amber-500/15 text-amber-600 border border-amber-500/30",
    stock: "2 unit",
  },
  {
    model: "Ferrari 296 GTB Hybrid",
    vin: "VIN · ZFF9220018",
    status: "Alokasi",
    statusColor: "bg-gradient-to-r from-[#33613A] via-[#4B8E55] to-[#6BA374] text-white shadow-xs",
    stock: "0 unit (Indent 4 bln)",
  },
  {
    model: "Audi Q5 Sportback 45 TFSI",
    vin: "VIN · WAUZZZ8R19",
    status: "OK",
    statusColor: "bg-gradient-to-r from-[#33613A] via-[#4B8E55] to-[#6BA374] text-white shadow-xs",
    stock: "8 unit",
  },
  {
    model: "Porsche Cayenne Coupe 2023",
    vin: "VIN · WP1ZZZ9228",
    status: "Diskon",
    statusColor: "bg-blue-500/15 text-blue-600 border border-blue-500/30",
    stock: "3 unit (>90 hari)",
  },
];

export const UrgentInventoryPanel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.2 }}
      className="bg-surfaceLight-card border border-surfaceLight-border p-6 rounded-2xl flex flex-col h-full shadow-xs"
    >
      {/* Header */}
      <div className="mb-5">
        <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
          KRITIS
        </span>
        <h3 className="text-[18px] font-display font-semibold text-textGray-display">
          Butuh perhatian segera
        </h3>
      </div>

      {/* Critical Items List */}
      <div className="flex-1 flex flex-col justify-between divide-y divide-surfaceLight-border">
        {CRITICAL_ITEMS.map((item, idx) => (
          <div key={idx} className="py-3.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
            <div>
              <h4 className="text-[14px] font-semibold text-textGray-display mb-0.5 leading-snug">
                {item.model}
              </h4>
              <span className="text-[12px] text-textGray-tertiary font-normal">
                {item.vin} · {item.stock}
              </span>
            </div>

            <span className={`px-3 py-1 rounded-full text-[11.5px] font-semibold ${item.statusColor}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default UrgentInventoryPanel;

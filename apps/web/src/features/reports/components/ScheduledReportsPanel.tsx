"use client";

import React from "react";
import { motion } from "framer-motion";

const SCHEDULED_ITEMS = [
  {
    id: "1",
    title: "Executive Summary · Bulanan",
    subtitle: "Kirim ke 4 penerima · setiap 1 bulan",
    date: "1 Agu 2026",
    dotColor: "bg-emerald-500",
  },
  {
    id: "2",
    title: "Sales Performance · Mingguan",
    subtitle: "Kirim ke 8 penerima · setiap Senin",
    date: "28 Jul 2026",
    dotColor: "bg-emerald-500",
  },
  {
    id: "3",
    title: "Inventory Report · Harian",
    subtitle: "Kirim ke Inventory Manager",
    date: "Besok 06:00",
    dotColor: "bg-emerald-500",
  },
  {
    id: "4",
    title: "Fleet Utilization · Mingguan",
    subtitle: "Kirim ke Fleet Manager",
    date: "28 Jul 2026",
    dotColor: "bg-emerald-500",
  },
];

export const ScheduledReportsPanel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.16 }}
      className="bg-surfaceLight-card border border-surfaceLight-border dark:border-[#222F43] p-4 sm:p-6 rounded-2xl flex flex-col h-full shadow-xs min-w-0"
    >
      {/* Panel Header */}
      <div className="mb-4 pb-3 border-b border-surfaceLight-border dark:border-[#222F43]">
        <span className="text-[10px] sm:text-[11px] font-semibold text-textGray-muted uppercase tracking-[0.08em] block mb-0.5">
          TERJADWAL
        </span>
        <h3 className="text-[16px] sm:text-[18px] font-display font-bold text-textGray-display leading-tight break-words">
          Laporan otomatis
        </h3>
      </div>

      {/* Item List */}
      <div className="flex flex-col divide-y divide-surfaceLight-border dark:divide-[#222F43]">
        {SCHEDULED_ITEMS.map((item) => (
          <div
            key={item.id}
            className="py-3 flex items-start justify-between gap-3 first:pt-1 last:pb-0"
          >
            <div className="flex items-start gap-2.5 min-w-0 flex-1">
              <span className={`w-2 h-2 rounded-full ${item.dotColor} shrink-0 mt-1.5`} />
              <div className="flex flex-col min-w-0 flex-1">
                <h4 className="text-[13.5px] font-bold text-textGray-display leading-snug break-words">
                  {item.title}
                </h4>
                <span className="text-[11.5px] text-textGray-tertiary font-normal leading-normal mt-0.5 break-words">
                  {item.subtitle}
                </span>
              </div>
            </div>

            <div className="text-[11.5px] font-semibold text-textGray-display whitespace-nowrap shrink-0 self-start mt-0.5">
              {item.date}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ScheduledReportsPanel;

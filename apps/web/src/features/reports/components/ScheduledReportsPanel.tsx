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
      className="bg-surfaceLight-card border border-surfaceLight-border p-6 rounded-2xl flex flex-col h-full shadow-xs"
    >
      {/* Panel Header */}
      <div className="mb-4">
        <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
          TERJADWAL
        </span>
        <h3 className="text-[18px] font-display font-semibold text-textGray-display">
          Laporan otomatis
        </h3>
      </div>

      {/* Item List */}
      <div className="flex flex-col divide-y divide-surfaceLight-border">
        {SCHEDULED_ITEMS.map((item) => (
          <div
            key={item.id}
            className="py-3 flex items-center justify-between gap-4 first:pt-1 last:pb-0"
          >
            <div className="flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full ${item.dotColor} shrink-0`} />
              <div>
                <h4 className="text-[13.5px] font-semibold text-textGray-display leading-snug">
                  {item.title}
                </h4>
                <span className="text-[11.5px] text-textGray-tertiary font-normal">
                  {item.subtitle}
                </span>
              </div>
            </div>

            <div className="text-[13px] font-semibold text-textGray-display shrink-0">
              {item.date}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ScheduledReportsPanel;

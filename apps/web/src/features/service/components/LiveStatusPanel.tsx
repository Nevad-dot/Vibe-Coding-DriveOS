"use client";

import React from "react";
import { motion } from "framer-motion";

const LIVE_BAY_ITEMS = [
  {
    id: "1",
    title: "Bay 12 · Audi Q7",
    meta: "Advisor: Nadia · Est. 45m",
    status: "In progress",
    dotColor: "bg-emerald-500",
  },
  {
    id: "2",
    title: "Bay 08 · Ferrari 296",
    meta: "Overdue 20m · escalated",
    status: "Overdue",
    dotColor: "bg-rose-500",
  },
  {
    id: "3",
    title: "Bay 03 · Tesla Model S",
    meta: "Software update · Est. 15m",
    status: "Wrap-up",
    dotColor: "bg-amber-500",
  },
  {
    id: "4",
    title: "Bay 07 · BMW M5",
    meta: "Diagnostic · started 08:20",
    status: "In progress",
    dotColor: "bg-emerald-500",
  },
  {
    id: "5",
    title: "Bay 15 · Mercedes G-Class",
    meta: "Waiting parts",
    status: "Blocked",
    dotColor: "bg-amber-500",
  },
];

export const LiveStatusPanel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.12 }}
      className="bg-surfaceLight-card border border-surfaceLight-border p-6 rounded-2xl flex flex-col h-full shadow-xs"
    >
      {/* Panel Header */}
      <div className="mb-4">
        <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
          BAY AKTIF
        </span>
        <h3 className="text-[18px] font-display font-semibold text-textGray-display">
          Live status
        </h3>
      </div>

      {/* Item List */}
      <div className="flex flex-col divide-y divide-surfaceLight-border">
        {LIVE_BAY_ITEMS.map((item) => (
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
                  {item.meta}
                </span>
              </div>
            </div>

            <div className="text-[12px] font-normal text-textGray-tertiary shrink-0">
              {item.status}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default LiveStatusPanel;

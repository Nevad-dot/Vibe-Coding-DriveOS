"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RestockOrderRecord } from "@/shared/lib/supabase/inventoryService";

interface UrgentInventoryPanelProps {
  restockOrders?: RestockOrderRecord[];
}

export const UrgentInventoryPanel: React.FC<UrgentInventoryPanelProps> = ({ restockOrders = [] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.2 }}
      className="bg-surfaceLight-card border border-surfaceLight-border p-4 sm:p-6 rounded-2xl flex flex-col h-full shadow-xs min-w-0"
    >
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-surfaceLight-border pb-3">
        <div className="min-w-0 flex-1">
          <span className="text-[10px] sm:text-[11px] font-semibold text-textGray-muted uppercase tracking-[0.08em] block mb-0.5">
            DATABASE RESTOCK ORDERS
          </span>
          <h3 className="text-[17px] sm:text-[18px] font-display font-bold text-textGray-display leading-tight truncate">
            Pengajuan Restock ({restockOrders.length})
          </h3>
        </div>
        <span className="text-[11px] sm:text-[11.5px] font-semibold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
          Live Database
        </span>
      </div>

      {/* Items Container */}
      <div className="flex flex-col divide-y divide-surfaceLight-border/70">
        <AnimatePresence initial={false}>
          {restockOrders.map((item) => {
            const isApproved = (item.status || "").toLowerCase().includes("approved");

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 first:pt-1 last:pb-0"
              >
                {/* Left: Vehicle Title & Metadata */}
                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                  <h4 className="text-[14px] sm:text-[14.5px] font-bold text-textGray-display leading-snug break-words">
                    {item.brand} {item.model}
                  </h4>
                  <div className="text-[12px] text-textGray-tertiary font-normal flex flex-wrap items-center gap-1.5 leading-normal">
                    <span>{item.branch || "Jakarta Pusat"}</span>
                    <span>·</span>
                    <span className="text-textGray-secondary font-medium">{item.priority || "Standar"}</span>
                  </div>
                </div>

                {/* Right: Quantity & Status Badge */}
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 mt-1 sm:mt-0">
                  <span className="text-[12px] sm:text-[12.5px] font-bold text-brand bg-brand/10 border border-brand/20 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                    {typeof item.quantity === "number" ? `${item.quantity} unit` : (item.quantity?.includes("unit") ? item.quantity : `${item.quantity} unit`)}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap shadow-2xs ${
                      isApproved
                        ? "bg-emerald-600 text-white"
                        : "bg-green-gradient-pill text-white"
                    }`}
                  >
                    {item.status || "Pending Approval"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default UrgentInventoryPanel;

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DealRecord } from "@/shared/lib/supabase/salesService";

interface HotLeadsListProps {
  deals?: DealRecord[];
}

export const HotLeadsList: React.FC<HotLeadsListProps> = ({ deals = [] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.3 }}
      className="bg-surfaceLight-card border border-surfaceLight-border p-6 rounded-2xl flex flex-col h-full shadow-xs"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
            DATABASE DEAL PIPELINE
          </span>
          <h3 className="text-[18px] font-display font-semibold text-textGray-display">
            Active Deals ({deals.length})
          </h3>
        </div>
        <span className="text-[11.5px] font-medium text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
          Live Database
        </span>
      </div>

      {/* Items */}
      <div className="flex flex-col divide-y divide-surfaceLight-border">
        <AnimatePresence initial={false}>
          {deals.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-[14px] font-semibold text-textGray-display mb-0.5 truncate">
                    {item.customerName}
                  </h4>
                  <span className="text-[12px] text-textGray-tertiary font-normal truncate block">
                    {item.vehicleModel} · {item.stage}
                  </span>
                </div>
              </div>

              <div className="text-[13.5px] font-bold text-textGray-display shrink-0">
                {item.dealValue}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default HotLeadsList;

"use client";

import React from "react";
import { motion } from "framer-motion";

const HOT_LEADS = [
  {
    name: "Andi Wijaya",
    meta: "Porsche 911 · Negotiation",
    prob: "92%",
    dotColor: "bg-emerald-500",
  },
  {
    name: "Sarah L.",
    meta: "BMW X7 · Awaiting DP",
    prob: "78%",
    dotColor: "bg-emerald-500",
  },
  {
    name: "PT Anugerah",
    meta: "Fleet 12 unit · Contract",
    prob: "88%",
    dotColor: "bg-emerald-500",
  },
  {
    name: "Michael T.",
    meta: "Mercedes S-Class · Test drive",
    prob: "65%",
    dotColor: "bg-amber-500",
  },
  {
    name: "Ayu Kartika",
    meta: "Audi Q7 · Proposal",
    prob: "71%",
    dotColor: "bg-emerald-500",
  },
];

export const HotLeadsList: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.3 }}
      className="bg-surfaceLight-card border border-surfaceLight-border p-6 rounded-2xl flex flex-col h-full shadow-xs"
    >
      {/* Header */}
      <div className="mb-4">
        <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
          HOT LEADS
        </span>
        <h3 className="text-[18px] font-display font-semibold text-textGray-display">
          38 siap closing
        </h3>
      </div>

      {/* Hot Leads List */}
      <div className="flex flex-col divide-y divide-surfaceLight-border">
        {HOT_LEADS.map((item, idx) => (
          <div key={idx} className="py-3.5 flex items-center justify-between gap-4 first:pt-1 last:pb-0">
            <div className="flex items-center gap-3">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.dotColor}`} />
              <div>
                <h4 className="text-[14px] font-semibold text-textGray-display mb-0.5">
                  {item.name}
                </h4>
                <span className="text-[12px] text-textGray-tertiary font-normal">{item.meta}</span>
              </div>
            </div>

            <div className="text-[14px] font-semibold text-brand shrink-0">
              {item.prob}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default HotLeadsList;

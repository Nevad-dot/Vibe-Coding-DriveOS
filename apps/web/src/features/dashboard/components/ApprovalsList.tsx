"use client";

import React from "react";
import { motion } from "framer-motion";

const APPROVALS = [
  {
    title: "Diskon 8% · Mercedes S-Class",
    meta: "Rendra · Jakarta Pusat · 12m",
    amount: "Rp 2,4 M",
  },
  {
    title: "Fleet contract · Kirana Logistik",
    meta: "Diva · Corporate · 1h",
    amount: "18 unit",
  },
  {
    title: "Trade-in · BMW X5 2022",
    meta: "Ilham · Bandung · 2h",
    amount: "Rp 890 jt",
  },
  {
    title: "Waive fee · Ferrari 296",
    meta: "Nadia · Service · 3h",
    amount: "Rp 12 jt",
  },
];

export const ApprovalsList: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.25 }}
      className="bg-surfaceLight-card border border-surfaceLight-border p-6 rounded-2xl flex flex-col h-full shadow-xs"
    >
      {/* Header & CTA */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
            MENUNGGU PERSETUJUAN
          </span>
          <h3 className="text-[18px] font-display font-semibold text-textGray-display">
            6 approval siap ditinjau
          </h3>
        </div>

        <motion.button
          whileHover={{ scale: 1.04, boxShadow: "0 6px 20px rgba(16,185,129,0.4)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="bg-green-gradient-pill text-white text-[13px] font-medium px-4 py-2 rounded-full transition-colors shadow-sm shrink-0 border border-white/20"
        >
          Review semua
        </motion.button>
      </div>

      {/* Approvals Items */}
      <div className="flex flex-col divide-y divide-surfaceLight-border">
        {APPROVALS.map((item, idx) => (
          <div key={idx} className="py-3.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
            <div>
              <h4 className="text-[14px] font-semibold text-textGray-display mb-0.5">
                {item.title}
              </h4>
              <span className="text-[12px] text-textGray-tertiary font-normal">{item.meta}</span>
            </div>
            <div className="text-[14px] font-semibold text-textGray-display shrink-0">
              {item.amount}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ApprovalsList;

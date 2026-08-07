"use client";

import React from "react";
import { motion } from "framer-motion";

const TOP_CUSTOMERS = [
  {
    name: "PT Anugerah Trans",
    meta: "Fleet · 5 tahun",
    amount: "Rp 18,2 M",
  },
  {
    name: "Bapak Handoko S.",
    meta: "Repeat · 4 unit Porsche",
    amount: "Rp 12,4 M",
  },
  {
    name: "PT Kirana Logistik",
    meta: "Fleet baru · 12 unit",
    amount: "Rp 8,6 M",
  },
  {
    name: "Ibu Amelia W.",
    meta: "Ferrari · loyal",
    amount: "Rp 9,6 M",
  },
  {
    name: "Bapak Rizky P.",
    meta: "BMW M-series · 3 unit",
    amount: "Rp 6,8 M",
  },
];

export const TopCustomersList: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.2 }}
      className="bg-surfaceLight-card border border-surfaceLight-border p-6 rounded-2xl flex flex-col h-full shadow-xs"
    >
      {/* Header */}
      <div className="mb-4">
        <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
          TOP CUSTOMER
        </span>
        <h3 className="text-[18px] font-display font-semibold text-textGray-display">
          Nilai transaksi tertinggi
        </h3>
      </div>

      {/* Top Customers List */}
      <div className="flex flex-col divide-y divide-surfaceLight-border">
        {TOP_CUSTOMERS.map((item, idx) => (
          <div key={idx} className="py-3.5 flex items-center justify-between gap-4 first:pt-1 last:pb-0">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              <div>
                <h4 className="text-[14px] font-semibold text-textGray-display mb-0.5">
                  {item.name}
                </h4>
                <span className="text-[12px] text-textGray-tertiary font-normal">{item.meta}</span>
              </div>
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

export default TopCustomersList;

"use client";

import React from "react";
import { motion } from "framer-motion";

const LIVE_DELIVERIES = [
  {
    code: "DL-2201 · Jakarta ➔ Bogor",
    meta: "ETA 18m · driver Arif",
    status: "En route",
    dotColor: "bg-emerald-500",
  },
  {
    code: "DL-2199 · Bandung ➔ Cimahi",
    meta: "Delay 12m · lalu lintas",
    status: "Delayed",
    dotColor: "bg-amber-500",
  },
  {
    code: "DL-2198 · Surabaya ➔ Sidoarjo",
    meta: "Selesai 09:12",
    status: "Delivered",
    dotColor: "bg-emerald-500",
  },
  {
    code: "DL-2197 · Bali ➔ Nusa Dua",
    meta: "Loading dock",
    status: "Loading",
    dotColor: "bg-emerald-500",
  },
];

export const LiveDeliveryPanel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.15 }}
      className="bg-surfaceLight-card border border-surfaceLight-border p-6 rounded-2xl flex flex-col justify-between h-full shadow-xs"
    >
      {/* Header */}
      <div className="mb-4">
        <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
          LIVE DELIVERY
        </span>
        <h3 className="text-[18px] font-display font-semibold text-textGray-display">
          4 delivery aktif
        </h3>
      </div>

      {/* Delivery Items List */}
      <div className="flex flex-col divide-y divide-surfaceLight-border">
        {LIVE_DELIVERIES.map((item, idx) => (
          <div key={idx} className="py-3.5 flex items-center justify-between gap-4 first:pt-1 last:pb-0">
            <div className="flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full ${item.dotColor} shrink-0`} />
              <div>
                <h4 className="text-[14px] font-semibold text-textGray-display mb-0.5">
                  {item.code}
                </h4>
                <span className="text-[12px] text-textGray-tertiary font-normal">{item.meta}</span>
              </div>
            </div>

            <div className="text-[12.5px] font-normal text-textGray-tertiary shrink-0">
              {item.status}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default LiveDeliveryPanel;

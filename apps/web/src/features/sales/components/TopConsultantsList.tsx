"use client";

import React from "react";
import { motion } from "framer-motion";

const CONSULTANTS = [
  {
    name: "Rendra Prasetya",
    deals: "18 unit · Rp 68,4 M",
    target: "120%",
    fillWidth: "100%",
  },
  {
    name: "Diva Anindya",
    deals: "15 unit · Rp 54,2 M",
    target: "105%",
    fillWidth: "88%",
  },
  {
    name: "Ilham Ramadhan",
    deals: "14 unit · Rp 48,9 M",
    target: "98%",
    fillWidth: "80%",
  },
  {
    name: "Nadia Utami",
    deals: "12 unit · Rp 39,1 M",
    target: "90%",
    fillWidth: "72%",
  },
  {
    name: "Kevin Sanjaya",
    deals: "10 unit · Rp 32,5 M",
    target: "82%",
    fillWidth: "64%",
  },
];

export const TopConsultantsList: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 26, delay: 0.2 }}
      className="bg-surfaceLight-card border border-surfaceLight-border p-6 rounded-2xl flex flex-col justify-between h-full shadow-xs"
    >
      {/* Header */}
      <div className="mb-5">
        <span className="text-[11px] font-medium text-textGray-muted uppercase tracking-[0.08em] block mb-1">
          TOP SALES CONSULTANT
        </span>
        <h3 className="text-[18px] font-display font-semibold text-textGray-display">
          Konsultan Terbaik Bulan Ini
        </h3>
      </div>

      {/* Consultants List with Brand Green Gradient Level Progress Fills */}
      <div className="flex flex-col gap-4">
        {CONSULTANTS.map((person, idx) => (
          <div key={idx} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[13px]">
              <div>
                <span className="font-semibold text-textGray-display block leading-snug">
                  {person.name}
                </span>
                <span className="text-[12px] text-textGray-tertiary font-normal">
                  {person.deals}
                </span>
              </div>
              <span className="font-semibold text-textGray-display text-[13px]">
                {person.target}
              </span>
            </div>

            {/* Level Bar Container */}
            <div className="w-full h-2 bg-surfaceLight-pearl border border-surfaceLight-border rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: person.fillWidth }}
                transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 + idx * 0.04 }}
                className="h-full bg-gradient-to-r from-[#33613A] via-[#4B8E55] to-[#6BA374] rounded-full shadow-xs"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TopConsultantsList;
